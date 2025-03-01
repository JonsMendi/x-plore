import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import ThreeDWorld from "../../canvas/world";
import GameDialog from "@/components/game-dialog";

const Screen: NextPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(""); // New: Store dialog message
  const [resetTimer, setResetTimer] = useState<(() => void) | null>(null);
  const [resetLevel, setResetLevel] = useState<(() => void) | null>(null);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black relative">
      <Head>
        <title>X-Plore</title>
        <meta
          name="description"
          content="A simple 3D world using Next.js and Three.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {gameStarted ? (
        <ThreeDWorld
          setIsDialogOpen={setIsDialogOpen}
          setDialogMessage={setDialogMessage} // New: Pass dialog message setter
          setResetTimer={setResetTimer}
          setResetLevel={setResetLevel}
        />
      ) : (
        <div className="text-center">
          <button
            onClick={() => setGameStarted(true)}
            className="text-black text-9xl font-bold bg-gray-800 px-10 py-5 rounded-md hover:bg-gray-700 transition"
          >
           <span className="text-red-500 px-2">X</span>-Plore

          </button>
          <p className="text-gray-800 mt-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
            let me tell you how bad you are at this.
          </p>
        </div>
      )}

      <GameDialog
        isOpen={isDialogOpen}
        message={dialogMessage}
        buttonText={
          dialogMessage === "You are not good at this."
            ? "Yes, I am not."
            : "I know."
        }
        onClose={() => setIsDialogOpen(false)}
        resetTimer={resetTimer}
        resetLevel={resetLevel}
      />
    </div>
  );
};

export default Screen;
