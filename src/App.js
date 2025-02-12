import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Simulator from "./pages/Simulator";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import { LanguageProvider } from "./context/Localization";

function App() {
  const location = useLocation();
  useEffect(() => {
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
  }, [location]);
  return (
    <>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Simulator />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LanguageProvider>
    </>
  );
}

export default App;
