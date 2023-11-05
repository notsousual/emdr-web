import React from "react";
import "./SectionLink.scss";

import { Link } from "react-router-dom";
import classNames from "classnames";

const SectionLink = ({ children, to, variation = "default" }) => {
  return (
    <Link
      to={to}
      className={classNames(
        "section-link",
        variation && `section-link--${variation}`
      )}
    >
      {children}
    </Link>
  );
};

export default SectionLink;
