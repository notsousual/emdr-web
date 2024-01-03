import React, { useState, useRef, useEffect } from "react";
import "./Simulator.scss";
import Tooltip from "./../components/Tooltip";
import { Link } from "react-router-dom";
import classNames from "classnames";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslate } from "../context/Localization";

function Simulator() {
  const translate = useTranslate(); // Initialize the translation function

  // Access the controls object for the current language
  const controls = translate("controls");

  // ... (rest of your component logic)

  const initDotSize = 50;
  const [dotSize, setDotSize] = useState(initDotSize);
  const [inputValue, setInputValue] = useState(1);
  const dotRef = useRef(null);
  const animationRef = useRef(null);

  const [collapsed, setCollapsed] = useState(false);
  const [themeKey, setThemeKey] = useState("blackAndWhite");
  // Get the current theme object using the theme key
  const currentTheme = controls.theme.themes[themeKey];

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

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleThemeChange = (e) => {
    // Update the theme key state with the selected theme key
    setThemeKey(e.target.value);
  };

  return (
    <div
      className={classNames(
        "Simulator",
        controls.theme.themes[themeKey] ===
          controls.theme.themes.movingGradient && "bg-animated"
      )}
      style={{
        "--bg": currentTheme.bg,
      }}
    >
      <div
        className={"dot"}
        ref={dotRef}
        style={{ "--dot-size": `${dotSize}px` }}
      />

      <div className="controls">
        <div className="controls__panel">
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

              <p className="label">
                {controls.theme.label}

                <span>
                  <select
                    value={themeKey}
                    onChange={handleThemeChange}
                    className="input"
                  >
                    {Object.entries(controls.theme.themes).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      )
                    )}
                  </select>
                </span>
              </p>

              <LanguageSwitcher className="input" />
            </>
          )}
        </div>

        <Tooltip text={controls.help.tooltip}>
          <Link to={"/about"} className="info-link">
            ?
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}

export default Simulator;
