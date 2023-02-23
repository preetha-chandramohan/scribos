import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { LocaleContext } from "../App";

const theme = {
  colors: {
    mainGold: "#e4cd92",
    mainGoldLight: "#fcf6e9",
    fontColor: "#1e2d69",
    dropdownColor: "#f8f3e5",
  },
};
const theme2 = {
  colors: {
    mainGold: "#e43d92",
    mainGoldLight: "#12f6e9",
    fontColor: "#1d69",
    dropdownColor: "#f8f3e5",
  },
};

const Theme = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const userLocale = useContext(LocaleContext);
  useEffect(() => {
    if (userLocale === "some") {
      setCurrentTheme(theme2);
    }
  }, [userLocale]);
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default Theme;
