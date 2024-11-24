import { useState, useEffect } from "react";
import { data } from "./data";

export default function DrumApp() {
  const [power, setPower] = useState(true);
  const [displayInfo, setDisplayInfo] = useState("");

  function handlePower() {
    setPower(!power);
    setDisplayInfo(power ? "Power Off" : "Power On");
    setTimeout(() => setDisplayInfo(""), 1500);
  }

  function handlePlayAudio(event) {
    // Find the audio element inside the clicked button
    const button = event.currentTarget;
    const audio = button.querySelector("audio");

    if (audio && power) {
      audio.currentTime = 0; // Reset audio to start
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setDisplayInfo(button.id); // Update display with drum name
      setTimeout(() => setDisplayInfo(""), 1500);
    }
  }

  function handleKeyDown(event) {
    const key = event.key.toUpperCase(); // Convert the key to uppercase
    const button = document.querySelector(`button[value="${key}"]`); // Target the button with matching key value

    if (button && power) {
      const audio = button.querySelector("audio");
      if (audio) {
        audio.currentTime = 0; // Reset audio to start
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        setDisplayInfo(button.id); // Update display with drum name
        setTimeout(() => setDisplayInfo(""), 1500);
      }
    }
  }

  useEffect(() => {
    // Attach global keydown listener
    const keyDownHandler = (event) => handleKeyDown(event);
    window.addEventListener("keydown", keyDownHandler);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [power]); // Dependency array ensures the effect re-runs if power changes

  return (
    <div id="drum-machine" className="app-container h-[100vh] w-full relative">
      <div className="bg-blue-500 text-white text-center p-5">
        <h1 className="text-3xl font-bold">Drum App</h1>
      </div>
      <div className="bg-slate-500 w-fit mx-auto h-auto columns-2 p-6 mt-[10rem] shadow-md border-blue-400 border-4">
        <div className="keys inline-grid grid-cols-3 grid-rows-3 gap-2">
          {data && data.length
            ? data.map((item, index) => (
                <button
                  value={item.keydown}
                  key={index}
                  id={item.drum_name}
                  className={
                    power
                      ? "drum-pad p-5 bg-white"
                      : "drum-pad p-5 bg-white cursor-not-allowed"
                  }
                  onClick={handlePlayAudio}
                  onKeyDown={handleKeyDown}
                  disabled={power ? false : true}
                >
                  {item.keydown}
                  <audio
                    src={item.drum_audio}
                    className="clip"
                    id={item.keydown}
                  ></audio>
                </button>
              ))
            : "Some error occured"}
        </div>
        <div id="display">
          <div className="power-container">
            <p className="text-xl text-white font-bold">Power</p>
            <div
              className={
                power
                  ? "power-btn-container h-4 w-10 bg-gray-800 my-2 mx-auto flex justify-end"
                  : "power-btn-container h-4 w-10 bg-gray-800 my-2 mx-auto flex justify-start"
              }
            >
              <button
                className={
                  power
                    ? "h-full w-[50%] bg-green-600"
                    : "h-full w-[50%] bg-red-600"
                }
                onClick={handlePower}
              ></button>
            </div>
          </div>
          <div className="display-info h-12 bg-slate-300 w-full mx-2 mt-6 p-3">
            <p>{displayInfo.toUpperCase()}</p>
          </div>
          <div className="volume-container h-1 w-full bg-gray-800 my-8 mx-2 flex justify-start relative">
            <div className="volume-controller w-1 h-3 bg-slate-400 absolute translate-y-2 bottom-1"></div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        Made by:{" "}
        <a
          className="text-blue-500 font-bold italic"
          href="https://github.com/Gareleon"
        >
          Gareleon!
        </a>
      </div>
    </div>
  );
}
