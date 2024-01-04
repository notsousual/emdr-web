import React from "react";
import SectionLink from "../components/SectionLink"; // Update with the actual import path
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <h1 className="title">
        <b>Oops! Page not found.</b>
      </h1>

      <h2 className="subtitle">
        <span>Read more on our </span>
        <span className="subtitle-link">
          <SectionLink to={"/about"}>About page</SectionLink>
        </span>

        <span>or try the </span>
        <span className="subtitle-link">
          <SectionLink to={"/"} variation="hyperlink">
            EMDR simulator
          </SectionLink>
        </span>
      </h2>
    </div>
  );
};

export default NotFoundPage;
