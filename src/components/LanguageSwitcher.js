import React from "react";
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
      <option value="cs">Čeština</option>
    </select>
  );
};

export default LanguageSwitcher;
