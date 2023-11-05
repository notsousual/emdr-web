import React, { useEffect } from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Simulator from "./pages/Simulator";
import About from "./pages/About";
function App() {
  const location = useLocation();
  useEffect(() => {
    // Check if the current route is '/about'
    if (location.pathname === "/about") {
      // Change the overflow on body to 'auto' when on the About page
      document.body.style.overflow = "auto";
    } else {
      // Change the overflow on body to 'hidden' for all other pages
      document.body.style.overflow = "hidden";
    }
    // Cleanup function to reset overflow when the component is unmounted or route changes
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [location]); // Re-run the effect when the location changes
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
