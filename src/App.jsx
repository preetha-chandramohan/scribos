import { logEvent } from "firebase/analytics";
import getUserLocale from "get-user-locale";
import React, { useEffect, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FormattedMessage, IntlProvider } from "react-intl";
import { createGlobalStyle } from "styled-components";
import Download from "./components/Download";
import DropDown from "./components/Dropdown";
import Logo from "./components/Logo";
import Texts from "./components/Texts";
import AppLocale from "./helpers/AppLocale";
import { INDONESIA, MALAYSIA, THAILAND, VIETNAM } from "./helpers/const";
import { Background, LangageContainer } from "./helpers/styled";
// import { Background } from "./helpers/styled";
import Theme from "./helpers/theme";
import { analytics } from "./index";
import Scribos from "./scribos-valigate/Scribos";

export function useUserCoutry() {
  const [country, setCountry] = useState("EN");
  useEffect(() => {
    fetch("https://ipapi.co/json/").then((res) =>
      // res.json().then((data) => setCountry(data["country_code"]?.toLowerCase())),
      res.json().then((data) => {
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

function App({ userLocaleX }) {
  const [userLocale, setUserLocale] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [currentAppLocale, setCurrentAppLocale] = useState(AppLocale["en"]);
  const [listOfLang, setListOfLang] = useState([]);
  const [region, setRegion] = useState("Select");
  const [short, setShort] = useState("EN");
  const [show, setShow] = useState(false);
  const country = useUserCoutry();
  useEffect(() => {
    setUserLocale(userLocaleX.substring(0, 2).toLowerCase());
    setUserRegion(userLocaleX.slice(-2).toLowerCase());
  }, [userLocaleX]);
  useEffect(() => {
    if (userLocale === "id" || userRegion === "id") {
      setShow(false);
      setShort("ID");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(INDONESIA);
      setListOfLang([]);
    } else if (userLocale === "vi" || userRegion === "vn") {
      setShow(false);
      setShort("VI");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(VIETNAM);
      setListOfLang([]);
    } else if (userLocale === "th" || userRegion === "th") {
      setShow(false);
      setShort("TH");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(THAILAND);
      setListOfLang([]);
    } else if (userLocale === "ms" || userRegion === "my") {
      setShow(true);
      setShort("EN");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(MALAYSIA);
      setListOfLang(["EN", "MS"]);
    } else if (userLocale === "en" || userRegion === "ph") {
      setShow(true);
      setShort("EN");
      setCurrentAppLocale(AppLocale["phEn"]);
      setRegion("Philippines");
      setListOfLang([]);
    } else {
      if (country === "id") {
        setShort("ID");
        setCurrentAppLocale(AppLocale["id"]);
        setRegion(INDONESIA);
        setListOfLang([]);
      } else if (country === "vn") {
        console.log("asdas")
        setShort("VI");
        setCurrentAppLocale(AppLocale["vn"]);
        setRegion(VIETNAM);
        setListOfLang([]);
      } else if (country === "th") {
        setShort("TH");
        setCurrentAppLocale(AppLocale["th"]);
        setRegion(THAILAND);
        setListOfLang([]);
      } else {
        setShort("EN");
        setRegion(MALAYSIA);
        setListOfLang(["EN", "MS"]);
      }
    }
  }, [country, userLocale, userRegion]);
  const handleLangPick = (lang) => {
    if (lang === "EN") {
      logEvent(analytics, "trust_lp_my_eng_chosen");
    } else {
      logEvent(analytics, "trust_lp_my_msa_chosen");
    }
    setCurrentAppLocale(AppLocale[lang.toLowerCase()]);
    setShort(lang);
  };
  const handleChangeUserLocale = (lang) => {
    setRegion(lang);
    if (lang === MALAYSIA) {
      setShow(true);
      logEvent(analytics, "trust_lp_my_chosen");
      setCurrentAppLocale(AppLocale["ms"]);
      setShort("MS");
      setListOfLang(["EN", "MS"]);
    } else if (lang === INDONESIA) {
      setShow(false);
      logEvent(analytics, "trust_lp_id_chosen");
      setCurrentAppLocale(AppLocale["id"]);
      setShort("ID");
      setListOfLang([]);
    } else if (lang === THAILAND) {
      setShow(false);
      logEvent(analytics, "trust_lp_th_chosen");
      setCurrentAppLocale(AppLocale["th"]);
      setShort("TH");
      setListOfLang([]);
    } else if (lang === "Philippines") {
      setShow(true);
      logEvent(analytics, "trust_lp_ph_chosen");
      setCurrentAppLocale(AppLocale["phEn"]);
      setShort("EN");
      setListOfLang([]);
    } else {
      setShow(false);
      logEvent(analytics, "trust_lp_vi_chosen");
      setCurrentAppLocale(AppLocale["vi"]);
      setShort("VN");
      setListOfLang([]);
    }
  };

  return (
    <HelmetProvider>
      <LocaleContext.Provider value={userLocale}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Theme>
            <GlobalStyles />
            <FormattedMessage id="general.text1">
              {(title) => (
                <Helmet>
                  <title>{title}</title>
                  <meta name="description" content="Trust" />
                  {region === MALAYSIA && <meta name="apple-itunes-app" content="app-id=6446016138, app-clip-bundle-id=my.enfagrow.trust.Clip, app-clip-display=card"></meta>}
                </Helmet>
              )}
            </FormattedMessage>
            <Background>
              <LangageContainer>
                <DropDown
                  onClick={handleChangeUserLocale}
                  withFlag
                  region={region}
                  list={[MALAYSIA, INDONESIA, VIETNAM, THAILAND, "Philippines"]}
                />
                <DropDown
                  list={listOfLang}
                  region={short}
                  onClick={handleLangPick}
                />
              </LangageContainer>
              {console.log(short)}
              {((show && region === MALAYSIA) || (show && region === "Philippines")) && <Scribos short={short}/>}
              {console.log(region)}
              {console.log(show)}
              {!show && <div>
                <Logo region={region} />
                <Texts />
              </div>}
              {!show && <Download region={region} isIOS={isIOS} isMobile={isMobile} />}
              <br />
            </Background>
          </Theme>
        </IntlProvider>
      </LocaleContext.Provider>
    </HelmetProvider>
  );
}

export default App;