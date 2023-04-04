import getUserLocale from "get-user-locale";
import React, { useEffect, useState } from "react";
// import { isIOS, isMobile } from "react-device-detect";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createGlobalStyle } from "styled-components";
import { Background } from "./helpers/styled";
import Theme from "./helpers/theme";
import Scribos from "./scribos-valigate/Scribos";

export function useUserCoutry() {
  const [country, setCountry] = useState("EN");
  useEffect(() => {
    fetch("https://ipapi.co/json/").then((res) =>
      res.json().then((data) => {
        console.log(data);
        console.log(data["country_code"]?.toLowerCase());
        setCountry(data["country_code"]?.toLowerCase())
      })
    );
  }, []);

  return country;
}

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Avenir Next', sans-serif;
    background: ${(props) =>
    `radial-gradient(${props.theme.colors.mainGoldLight}, ${props.theme.colors.mainGold})`};
  }`;

export const LocaleContext = React.createContext(getUserLocale());

function App() {
  const country = useUserCoutry();
  console.log(country);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Consumer protection</title>
        <meta name="description" content="Trust" />
        <meta name="apple-itunes-app" content="app-id=6446016138, app-clip-bundle-id=my.enfagrow.trust.Clip, app-clip-display=card"></meta>
      </Helmet>
      <Theme>
        <GlobalStyles />
        <Background>
          <Scribos />
        </Background>
      </Theme>
    </HelmetProvider>
  );
}

export default App;