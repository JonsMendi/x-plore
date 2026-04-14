'use client'

import { useEffect, useState } from 'react'

type LeaderboardEntry = {
  player_name: string
  level: number
  elapsed_seconds: number
  created_at: string
}

type LeaderboardModalProps = {
  isOpen: boolean
  onClose: () => void
  level?: number
  pendingScore?: { level: number; elapsedSeconds: number } | null
}

export default function LeaderboardModal({ isOpen, onClose, level, pendingScore }: LeaderboardModalProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const loadLeaderboard = async () => {
    setLoading(true)
    setError('')
    try {
      const levelQuery = typeof level === 'number' ? `?level=${level}&limit=10` : '?limit=10'
      const response = await fetch(`/api/leaderboard${levelQuery}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error ?? 'Failed to fetch leaderboard')
      setEntries(data.entries ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    loadLeaderboard()
    setSaved(false)
    setName('')
  }, [isOpen, level])

  const handleSaveScore = async () => {
    if (!pendingScore || !name.trim()) return
    setError('')
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: name.trim(),
          level: pendingScore.level,
          elapsedSeconds: pendingScore.elapsedSeconds,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error ?? 'Failed to save score')
      setSaved(true)
      loadLeaderboard()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save score')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-1 text-2xl font-bold text-black">Leaderboard</h2>
        <p className="mb-4 text-sm text-gray-600">Best times (lower is better).</p>

        {pendingScore ? (
          <div className="mb-4 rounded-md bg-gray-100 p-3">
            <p className="text-sm text-black">
              Your run: level {pendingScore.level} in {pendingScore.elapsedSeconds}s
            </p>
            {!saved && (
              <div className="mt-3 flex gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-black"
                  maxLength={40}
                />
                <button
                  onClick={handleSaveScore}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            )}
            {saved && <p className="mt-2 text-sm font-medium text-green-700">Score saved.</p>}
          </div>
        ) : null}

        <div className="max-h-72 overflow-auto rounded border border-gray-200">
          {loading ? (
            <p className="p-3 text-sm text-gray-600">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="p-3 text-sm text-gray-600">No scores yet.</p>
          ) : (
            <table className="w-full text-left text-sm text-black">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Player</th>
                  <th className="px-3 py-2">Level</th>
                  <th className="px-3 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={`${entry.player_name}-${entry.created_at}-${index}`} className="border-t border-gray-100">
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{entry.player_name}</td>
                    <td className="px-3 py-2">{entry.level}</td>
                    <td className="px-3 py-2">{entry.elapsed_seconds}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

