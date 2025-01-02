import { useEffect, useState } from "react";
import useQuizStore from "./store/useQuizStore";

import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import { Toaster } from "react-hot-toast";
import Room from "./components/Room";
function App() {
  const { connectSocket, disconnectSocket, roomId, userId } = useQuizStore();
  const [currentRoom, setCurrentRoom] = useState("Home");

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <>
      <Toaster />
      {roomId == null && (
        <div>
          <button
            onClick={() => setCurrentRoom("Create")}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Create Room
          </button>
          <button
            onClick={() => setCurrentRoom("Join")}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Join Room
          </button>
        </div>
      )}
      {currentRoom == "Create" && roomId == null && <CreateRoom />}
      {currentRoom == "Join" && roomId == null && <JoinRoom />}
      {roomId != null && <Room />}
    </>
  );
}

export default App;
  