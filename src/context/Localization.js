import React, { createContext, useState, useContext } from "react";

// Localization resources

const bg = {
  movingGradient:
    "linear-gradient(270deg, rgb(28, 0, 64),rgb(77, 14, 149),rgb(39, 25, 111), rgb(11, 91, 60), rgb(39, 25, 111), rgb(77, 14, 149), rgb(28, 0, 64)), rgb(36, 0, 84)",

  black: "rgb(30,30,30)",
  blue: "#246bb4",
};

const resources = {
  en: {
    welcome: "Welcome to React",
    controls: {
      speed: {
        title: "Speed: ",
        units: "Hz",
        tooltip:
          "The frequency of eye movements in hertz (Hz) denotes the number of cycles (back and forth movements) per second. If eye movements are performed at a frequency of 1 Hz, it means there is one complete cycle per second.",
      },
      mode: {
        title: "Mode:",
        options: {
          eyeMovement: "Eye movement",
          bilateralTapping: "Bilateral tapping",
        },
      },
      dotSize: "Dot size: ",
      help: {
        tooltip:
          "Learn more about what this tool does and EMDR therapy by clicking on the question mark button!",
      },
      theme: {
        label: "Theme: ",
        themes: {
          movingGradient: {
            bg: bg.movingGradient,
            label: "Moving gradient",
          },
          blackAndWhite: {
            bg: bg.black,
            label: "Black and white",
          },
          blue: {
            bg: bg.blue,
            label: "Blue",
          },
        },
      },
    },
    // ...other translations
  },
  ru: {
    // Russian translations
    controls: {
      speed: {
        title: "Скорость: ",
        units: "Гц",
        tooltip:
          "Частота движений глаз в герцах (Гц) обозначает количество циклов (движений взад и вперед) в секунду. Если движения глаз выполняются с частотой 1 Гц, это означает, что за секунду происходит один полный цикл.",
      },
      mode: {
        title: "Режим:",
        options: {
          eyeMovement: "Движение глаз",
          bilateralTapping: "Билатеральное постукивание",
        },
      },
      dotSize: "Размер точки: ",
      help: {
        tooltip:
          "Узнайте больше о том, что делает этот инструмент и терапии EMDR, нажав на кнопку с вопросительным знаком!",
      },
      theme: {
        label: "Тема: ",
        themes: {
          movingGradient: {
            bg: bg.movingGradient,
            label: "Градиент",
          },
          blackAndWhite: {
            bg: bg.black,
            label: "Черно-белый",
          },
          blue: {
            bg: bg.blue,
            label: "Синий",
          },
        },
      },
    },
    // ...other translations...
  },
  uk: {
    // Ukrainian translations
    controls: {
      speed: {
        title: "Швидкість: ",
        units: "Гц",
        tooltip:
          "Частота рухів очей в герцах (Гц) означає кількість циклів (рухів туди й назад) за секунду. Якщо рухи очей виконуються з частотою 1 Гц, це означає, що за секунду відбувається один повний цикл.",
      },
      mode: {
        title: "Режим:",
        options: {
          eyeMovement: "Рух очей",
          bilateralTapping: "Білатеральний постукування",
        },
      },
      dotSize: "Розмір точки: ",
      help: {
        tooltip:
          "Дізнайтеся більше про те, що робить цей інструмент і терапію EMDR, натиснувши на кнопку з питанням!",
      },
      theme: {
        label: "Тема: ",
        themes: {
          movingGradient: {
            bg: bg.movingGradient,
            label: "Рухомий градієнт",
          },
          blackAndWhite: {
            bg: bg.black,
            label: "Чорно-білий",
          },
          blue: {
            bg: bg.blue,
            label: "Синій",
          },
        },
      },
    },
  },

  // ...other translations...

  cs: {
    // Czech translations
    controls: {
      speed: {
        title: "Rychlost: ",
        units: "Hz",
        tooltip:
          "Frekvence očních pohybů v hertzích (Hz) označuje počet cyklů (pohybů tam a zpět) za sekundu. Pokud se oční pohyby provádějí frekvencí 1 Hz, znamená to, že za sekundu proběhne jeden úplný cyklus.",
      },
      mode: {
        title: "Režim:",
        options: {
          eyeMovement: "Pohyb očí",
          bilateralTapping: "Bilaterální klepání",
        },
      },
      dotSize: "Velikost tečky: ",
      help: {
        tooltip:
          "Další informace o tom, co tento nástroj dělá a terapii EMDR, kliknutím na tlačítko s otazníkem!",
      },
      theme: {
        label: "Téma: ",
        themes: {
          movingGradient: {
            bg: bg.movingGradient,
            label: "Pohybující se gradient",
          },
          blackAndWhite: {
            bg: bg.black,
            label: "Černobílý",
          },
          blue: {
            bg: bg.blue,
            label: "Modrý",
          },
        },
      },
    },
    // ...other translations...
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const defaultLanguage = navigator?.language?.split("-")[0] ?? "en";
  const [language, setLanguage] = useState(
    resources[defaultLanguage] ? defaultLanguage : "en"
  );

  const changeLanguage = (lang) => {
    if (resources[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslate = () => {
  const { language } = useContext(LanguageContext);
  return (key) => resources[language][key] || key;
};

export const useLanguage = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  return { language, changeLanguage };
};
