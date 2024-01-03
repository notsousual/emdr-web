import React from "react";
// import { useLanguage } from "./..Localization";
import "./LanguageSwitcher.scss";
import { useLanguage } from "../context/Localization";

const LanguageSwitcher = ({ className }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className={className}
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="uk">Українська</option>
      <option value="cz">Čeština</option>
      {/* Czech option added for demonstration */}
    </select>
  );
};

export default LanguageSwitcher;
