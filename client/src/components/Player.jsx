import { FaBell } from "react-icons/fa";
import useQuizStore from "../store/useQuizStore";

const Player = ({ playName, playNumber, score, isActive }) => {
  const { winner } = useQuizStore();
  return (
    <div
      className={`p-6 rounded-lg ${
        winner == playNumber ? "bg-green-400" : "bg-white"
      } shadow-md`}
    >
      <h2 className="text-xl font-bold mb-4">Player Name:-{playName}</h2>
      <h2 className="text-xl font-bold mb-4">Player Id :-{playNumber}</h2>
      {/* <div className="text-3xl font-bold mb-4">{score}</div> */}
    </div>
  );
};

export default Player;
