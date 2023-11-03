import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import Tooltip from "./components/Tooltip";

const controls = {
  speed: {
    title: "Speed: ",
    units: "Hz",
    tooltip:
      "The frequency of eye movements in hertz (Hz) denotes the number of cycles (back and forth movements) per second. If eye movements are performed at a frequency of 1 Hz, it means there is one complete cycle per second.",
  },
  mode: {
    title: "Mode:",
    options: {
      eyeMovement: "Eye movement",
      bilateralTapping: "Bilateral tapping",
    },
  },

  dotSize: "Dot size: ",
};

function App() {
  const initDotSize = 50;
  const [dotSize, setDotSize] = useState(initDotSize);
  const [inputValue, setInputValue] = useState(1);
  const dotRef = useRef(null);
  const animationRef = useRef(null);
  const [mode, setMode] = useState(controls.mode.eyeMovement);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const element = dotRef.current;
    if (element) {
      // Create the animation if it does not exist.
      if (!animationRef.current) {
        animationRef.current = element.animate(
          [{ left: "5vw" }, { left: `calc(100% - ${initDotSize}px - 5vw)` }],
          {
            duration: 500,
            iterations: Infinity,
            direction: "alternate",
            easing: "ease-in-out",
          }
        );
      }
    }
  }, [initDotSize]); // Empty array to run this effect only once on mount.

  const handleDotSizeChange = (amount) => {
    setDotSize((prevSize) => {
      const newSize = Math.max(10, prevSize + amount);

      // Get the current progress of the animation.
      const currentProgress =
        animationRef.current.currentTime /
        animationRef.current.effect.getTiming().duration;

      // Update keyframes without restarting the animation.
      const newKeyframes = [
        { left: "5vw" },
        { left: `calc(100% - ${newSize}px - 5vw)` },
      ];

      animationRef.current.effect.setKeyframes(newKeyframes);

      // Ensure the animation's progress remains consistent.
      animationRef.current.currentTime =
        currentProgress * animationRef.current.effect.getTiming().duration;

      return newSize;
    });
  };

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value.replace(",", "."));
    setInputValue(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      const progress =
        animationRef.current.currentTime /
        animationRef.current.effect.getTiming().duration;

      animationRef.current.effect.updateTiming({
        duration: (newValue / 2) * 1000,
      });
      animationRef.current.currentTime = ((progress * newValue) / 2) * 1000;
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <>
      <div
        className={"dot"}
        ref={dotRef}
        style={{ "--dot-size": `${dotSize}px` }}
      ></div>
      <div className="controls">
        <button className="collapse-btn" onClick={toggleCollapse}>
          {collapsed ? (
            // menu SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          ) : (
            // Cross SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          )}
        </button>

        {!collapsed && (
          <>
            <label className="label">
              {controls.mode.title}
              <select
                value={mode}
                onChange={handleModeChange}
                className="input"
              >
                {Object.entries(controls.mode.options).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              <Tooltip text={controls.speed.tooltip}>
                <span>{controls.speed.title}</span>
              </Tooltip>

              <input
                type="text" // use "text" instead of "number" to control the format
                inputMode="decimal" // helps bring up the numeric keypad on mobile devices
                pattern="[0-9]*|[0-9]*[.,]?[0-9]*" // this pattern is to ensure iOS brings up the numeric keyboard
                value={inputValue}
                onChange={handleInputChange}
                className="input"
              />

              <Tooltip text={controls.speed.tooltip}>
                <span>{controls.speed.units}</span>
              </Tooltip>
            </label>

            <>
              <p className="label">
                {controls.dotSize}
                <span>
                  <button
                    onClick={() => handleDotSizeChange(10)}
                    className="button"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDotSizeChange(-10)}
                    className="button"
                  >
                    –
                  </button>
                </span>
              </p>
            </>
          </>
        )}
      </div>
    </>
  );
}

export default App;
