import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Tooltip.scss";

const Tooltip = ({ children, text, position }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Combine tooltip base class with position and visibility classes
  const tooltipClasses = `tooltip-text ${position} ${
    isVisible ? "tooltip--visible" : ""
  }`;

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <p className={tooltipClasses}>{text}</p>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

Tooltip.defaultProps = {
  position: "bottom",
};

export default Tooltip;
