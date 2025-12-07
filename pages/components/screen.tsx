import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import Head from "next/head";
import ThreeDWorld from "../../canvas/world";
import GameDialog from "@/components/game-dialog";
import StartCube from "@/canvas/start-cube";
import { gameStore } from "../../stores/GameStore";
import { dialogStore } from "../../stores/DialogStore";

const Screen: NextPage = observer(() => {
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

      {gameStore.gameStarted ? (
        <ThreeDWorld
          isDialogOpen={dialogStore.isDialogOpen}
          setIsDialogOpen={dialogStore.setIsDialogOpen}
          setDialogMessage={dialogStore.setDialogMessage}
          setResetTimer={gameStore.setResetTimer}
          setResetLevel={gameStore.setResetLevel}
          onSceneLoaded={gameStore.handleSceneLoaded}
          startTimer={gameStore.startTimer}
        />
      ) : (
        <div className="text-center">
          <div className="text-gray-700 text-6xl font-bold px-10 py-5 rounded-md">
            <span className="text-red-500">X</span>-Plore
          </div>

          <StartCube
            onClick={gameStore.startGame}
            onPointerOver={() => gameStore.setHover(true)}
            onPointerOut={() => gameStore.setHover(false)}
          />
          <p
            className={`mt-2 absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${
              gameStore.hover ? "text-gray-300" : "text-gray-600"
            }`}
          >
            let me tell you how bad you are at this.
          </p>
        </div>
      )}

      {gameStore.sceneLoaded && (
        <GameDialog
          isOpen={dialogStore.isDialogOpen}
          message={dialogStore.dialogMessage}
          buttonText={
            dialogStore.dialogMessage === "You are not good at this."
              ? "Yes, I am not."
              : "I know."
          }
          onClose={dialogStore.closeDialog}
          resetTimer={gameStore.resetTimer}
          resetLevel={gameStore.resetLevel}
        />
      )}
    </div>
  );
});

export default Screen;
