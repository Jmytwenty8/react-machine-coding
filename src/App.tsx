import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar/progress-bar";

const App = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProgressBar value={value} />
    </div>
  );
};

export default App;
