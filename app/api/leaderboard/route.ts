import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

type Entry = {
  player_name: string
  level: number
  elapsed_seconds: number
  created_at: string
}

const memoryEntries: Entry[] = []

function hasDatabaseConfigured() {
  return Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)
}

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leaderboard_entries (
      id SERIAL PRIMARY KEY,
      player_name VARCHAR(40) NOT NULL,
      level INTEGER NOT NULL,
      elapsed_seconds INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `
}

export async function GET(request: NextRequest) {
  try {
    const levelParam = request.nextUrl.searchParams.get('level')
    const limitParam = request.nextUrl.searchParams.get('limit')

    const level = levelParam ? Number(levelParam) : null
    const limit = Math.min(Math.max(Number(limitParam || '10'), 1), 50)

    if (!hasDatabaseConfigured()) {
      const filtered = memoryEntries
        .filter((entry) => (typeof level === 'number' && Number.isFinite(level) ? entry.level === level : true))
        .sort((a, b) =>
          a.elapsed_seconds !== b.elapsed_seconds
            ? a.elapsed_seconds - b.elapsed_seconds
            : new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
        .slice(0, limit)
      return NextResponse.json({ entries: filtered, storage: 'memory' })
    }

    await ensureTable()
    const result =
      typeof level === 'number' && Number.isFinite(level)
        ? await sql`
            SELECT player_name, level, elapsed_seconds, created_at
            FROM leaderboard_entries
            WHERE level = ${level}
            ORDER BY elapsed_seconds ASC, created_at ASC
            LIMIT ${limit}
          `
        : await sql`
            SELECT player_name, level, elapsed_seconds, created_at
            FROM leaderboard_entries
            ORDER BY elapsed_seconds ASC, created_at ASC
            LIMIT ${limit}
          `

    return NextResponse.json({ entries: result.rows, storage: 'postgres' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load leaderboard', details: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const playerName = String(body?.playerName ?? '').trim().slice(0, 40)
    const level = Number(body?.level)
    const elapsedSeconds = Number(body?.elapsedSeconds)

    if (!playerName || !Number.isFinite(level) || !Number.isFinite(elapsedSeconds)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    if (!hasDatabaseConfigured()) {
      memoryEntries.push({
        player_name: playerName,
        level: Math.max(1, Math.floor(level)),
        elapsed_seconds: Math.max(0, Math.floor(elapsedSeconds)),
        created_at: new Date().toISOString(),
      })
      return NextResponse.json({ ok: true, storage: 'memory' })
    }

    await ensureTable()
    await sql`
      INSERT INTO leaderboard_entries (player_name, level, elapsed_seconds)
      VALUES (${playerName}, ${Math.max(1, Math.floor(level))}, ${Math.max(0, Math.floor(elapsedSeconds))})
    `

    return NextResponse.json({ ok: true, storage: 'postgres' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save score', details: String(error) }, { status: 500 })
  }
}

