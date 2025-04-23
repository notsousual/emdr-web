import React, { useState, useRef, useEffect } from "react";
import "./Simulator.scss";
import Tooltip from "./../components/Tooltip";
import { Link } from "react-router-dom";
import classNames from "classnames";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslate } from "../context/Localization";

function Simulator() {
  const translate = useTranslate();
  const controls = translate("controls");

  const initDotSize = 50;
  const [dotSize, setDotSize] = useState(initDotSize);
  const [inputValue, setInputValue] = useState("1");
  const dotRef = useRef(null);
  const animationRef = useRef(null);

  const [collapsed, setCollapsed] = useState(false);
  const [themeKey, setThemeKey] = useState("blackAndWhite");
  const currentTheme = controls.theme.themes[themeKey];

  useEffect(() => {
    const element = dotRef.current;
    if (element && !animationRef.current) {
      animationRef.current = element.animate(
        [{ left: "5vw" }, { left: `calc(100% - ${dotSize}px - 5vw)` }],
        {
          duration: 1000, // Default to 1Hz
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }
      );
    }
  }, []);

  const handleDotSizeChange = (amount) => {
    setDotSize((prevSize) => {
      const newSize = Math.max(10, prevSize + amount);
      const progress =
        animationRef.current.currentTime /
        animationRef.current.effect.getTiming().duration;

      animationRef.current.effect.setKeyframes([
        { left: "5vw" },
        { left: `calc(100% - ${newSize}px - 5vw)` },
      ]);
      animationRef.current.currentTime =
        progress * animationRef.current.effect.getTiming().duration;

      return newSize;
    });
  };

  const handleInputChange = (e) => {
    const input = e.target.value.replace(",", ".");
    setInputValue(e.target.value);

    const frequency = parseFloat(input);
    if (!isNaN(frequency) && frequency > 0 && animationRef.current) {
      const duration = 1000 / frequency; // Duration per full cycle
      const progress =
        animationRef.current.currentTime /
        animationRef.current.effect.getTiming().duration;

      animationRef.current.effect.updateTiming({ duration });
      animationRef.current.currentTime = progress * duration;
    }
  };

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const handleThemeChange = (e) => setThemeKey(e.target.value);

  return (
    <div
      className={classNames(
        "Simulator",
        currentTheme === controls.theme.themes.movingGradient && "bg-animated"
      )}
      style={{
        "--bg": currentTheme.bg,
      }}
    >
      <div
        className="dot"
        ref={dotRef}
        style={{ "--dot-size": `${dotSize}px` }}
      />

      <div className="controls">
        <div className="controls__panel">
          <button className="collapse-btn" onClick={toggleCollapse}>
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            ) : (
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
                  type="text"
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
