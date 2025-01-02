import { useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

const Timer = ({ time, isRunning, onTimeUp }) => {
  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        onTimeUp(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, onTimeUp]);

  return (
    <div className="flex items-center justify-center gap-2 text-4xl font-bold mb-8">
      <FaClock className="text-blue-500" />
      <span>{time}</span>
    </div>
  );
};

export default Timer;