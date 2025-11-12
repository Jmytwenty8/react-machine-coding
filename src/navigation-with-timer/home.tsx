import { useEffect, useState } from "react"

const Home = () => {
    const [timer, setTimer] = useState<number>(() => parseInt(localStorage.getItem("timer") ?? "0") || 0);

    function timerChange(e: StorageEvent) {
        if (e.key === "timer") {
            setTimer(parseInt(e.newValue ?? "0") || 0);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("timer")) {
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => {
                const next = prev + 1;
                localStorage.setItem("timer", next.toString());
                return next;
            });
        }, 1000);

        return () => {
            clearInterval(interval)
        };

    }, []);

    useEffect(() => {
        window.addEventListener("storage", timerChange);
        return () => {
            window.removeEventListener("storage", timerChange);
        }
    }, []);


    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Home</h1>
            <p>Timer: {timer}</p>
        </div>
    );
}

export default Home
