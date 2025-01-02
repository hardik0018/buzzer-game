import { FaPlay, FaStop, FaRedo } from "react-icons/fa";
import Player from "./Player";
import Timer from "./Timer";
import useQuizStore from "../store/useQuizStore";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

function Room() {
  const {
    startGame,
    resetGame,
    stopGame,
    timer,
    roomId,
    isRunning,
    updateTime,
    roomUser,
    hanldeBuzz,
    isOwner,
    userId,
    winner,
    exit,
  } = useQuizStore();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        updateTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, []);
 
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {isOwner && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Buzzer Game</h1>
          <h1 className="text-4xl font-bold text-center mb-8">{roomId}</h1>
          <Timer time={timer} isRunning={isRunning} onTimeUp={updateTime} />

          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 
                 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRunning}
            >
              <FaPlay /> Start
            </button>
            <button
              onClick={stopGame}
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
                 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg"
            >
              <FaStop /> Stop
            </button>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 
                 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg"
            >
              <FaRedo /> Reset
            </button>
            <button
              onClick={exit}
              className={`bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
                 text-white font-bold py-3 px-4 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg disabled:bg-gray-500`}
            >
              <IoClose size={30} /> Exit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.keys(roomUser).map((item, i) => (
              <Player
                key={i}
                playName={roomUser[item].name}
                playNumber={item}
                score={roomUser[item].score}
                isActive={roomUser[item].isActive}
              />
            ))}
          </div>
        </div>
      )}

      {!isOwner && (
        <>
          <h1 className="text-4xl font-bold text-center mb-8">Buzzer Game</h1>
          <Timer time={timer} isRunning={isRunning} onTimeUp={updateTime} />

          <div className="flex gap-4 justify-center mb-8">
            <button
              disabled={winner != null || !isRunning ? true : false}
              onClick={() => hanldeBuzz(userId)}
              className={`${
                winner != null || !isRunning
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 
                 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg disabled:bg-gray-500`}
            >
              <FaPlay /> Buzz
            </button>
            <button
              onClick={exit}
              className={` bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
                 text-white font-bold py-3 px-4 rounded-lg flex items-center gap-2 transform hover:scale-105 
                 transition-all shadow-lg disabled:bg-gray-500`}
            >
              <IoClose size={30} /> Exit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Room;
