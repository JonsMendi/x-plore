import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import ThreeDWorld from "../../canvas/world";
import GameDialog from "@/components/game-dialog";
import StartCube from "@/canvas/start-cube";

const Screen: NextPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [resetTimer, setResetTimer] = useState<(() => void) | null>(null);
  const [resetLevel, setResetLevel] = useState<(() => void) | null>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [hover, setHover] = useState(false);

  const handleSceneLoaded = () => {
    setSceneLoaded(true);
    setStartTimer(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

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
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          setDialogMessage={setDialogMessage}
          setResetTimer={setResetTimer}
          setResetLevel={setResetLevel}
          onSceneLoaded={handleSceneLoaded}
          startTimer={startTimer}
        />
      ) : (
        <div className="text-center">
          <div className="text-gray-700 text-6xl font-bold px-10 py-5 rounded-md">
            <span className="text-red-500">X</span>-Plore
          </div>

          <StartCube
            onClick={startGame}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          />
          <p
            className={`mt-2 absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${
              hover ? "text-gray-300" : "text-gray-600"
            }`}
          >
            let me tell you how bad you are at this.
          </p>
        </div>
      )}

      {sceneLoaded && (
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
      )}
    </div>
  );
};

export default Screen;
