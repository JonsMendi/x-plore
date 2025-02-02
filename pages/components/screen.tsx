import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import ThreeDWorld from "../../canvas/world";

const Screen: NextPage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <Head>
        <title>X-Plore</title>
        <meta name="description" content="A simple 3D world using Next.js and Three.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {gameStarted ? (
        <ThreeDWorld />
      ) : (
        <button
          onClick={() => setGameStarted(true)}
          className="text-black text-9xl font-bold bg-gray-800 px-10 py-5 hover:bg-gray-700 transition"
        >
          X-Plore
        </button>
      )}
    </div>
  );
};

export default Screen;
