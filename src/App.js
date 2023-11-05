import React from "react";
import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Simulator from "./pages/Simulator";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Simulator />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* If no route matches, the NotFoundPage component will be rendered. */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
