import { useState } from "react";
import useQuizStore from "../store/useQuizStore";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState();
  const [name, setName] = useState("");
  const { onJoinRoom } = useQuizStore();
  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="id"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Your Team Name
        </label>
        <input
          type="id"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your Name"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="id"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Join Id
        </label>
        <input
          type="id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Room id"
          required
        />
      </div>

      <button
        onClick={() => {
          onJoinRoom(roomId, name);
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default JoinRoom;
