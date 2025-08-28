import { useEffect, useState } from "react";

const ProgressBar = ({ value = 10 }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
  }, [value]);

  return (
    <div
      className='h-screen w-screen flex justify-center items-center flex-col gap-2'
      role='progressbar'
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      ProgressBar
      <div
        className={`bg-gray-300 w-1/3 rounded-2xl flex justify-center items-center relative overflow-hidden`}
      >
        <div
          className='absolute h-full bg-green-500 top-0 left-0 transition-all duration-300 ease-in-out'
          style={{ width: `${percent}%` }}
        />
        <span
          className={`z-10 font-semibold ${
            percent > 49 ? "text-white" : "text-black"
          }`}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
