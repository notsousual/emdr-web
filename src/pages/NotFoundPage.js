import React from "react";
import { useNavigate } from "react-router-dom";
import SectionLink from "../components/SectionLink"; // Update with the actual import path
import "./NotFoundPage.scss";
const NotFoundPage = () => {
  const navigate = useNavigate();

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
          <SectionLink to={"/about"} variation="hyperlink">
            EMDR simulator
          </SectionLink>
        </span>
      </h2>
    </div>
  );
};

export default NotFoundPage;
