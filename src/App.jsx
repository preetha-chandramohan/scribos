import { logEvent } from "firebase/analytics";
import getUserLocale from "get-user-locale";
import React, { useEffect, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { FormattedMessage, IntlProvider } from "react-intl";
import { createGlobalStyle } from "styled-components";
import AppLocale from "./helpers/AppLocale";
import Background from "./components/Background";
import Download from "./components/Download";
import DropDown from "./components/Dropdown";
import Logo from "./components/Logo";
import Texts from "./components/Texts";
import LangageContainer from "./components/Top";
import { INDONESIA, MALAYSIA, THAILAND, VIETNAM } from "./helpers/const";
import { analytics } from "./index";
import Theme from "./helpers/theme";
import Scribos from "./scribos-valigate/Scribos";

export function useUserCoutry() {
  const [country, setCountry] = useState("EN");
  useEffect(() => {
    fetch("https://ipapi.co/json/").then((res) =>
      res.json().then((data) => setCountry(data["country_code"]?.toLowerCase()))
    );
  }, []);

  return country;
}

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Avenir Next', sans-serif;
    background: ${(props) =>
      `radial-gradient(${props.theme.colors.mainGoldLight}, ${props.theme.colors.mainGold})`};
  }
  
`;

export const LocaleContext = React.createContext(getUserLocale());

function App({ userLocaleX }) {
  const [userLocale, setUserLocale] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [currentAppLocale, setCurrentAppLocale] = useState(AppLocale["en"]);
  const [listOfLang, setListOfLang] = useState([]);
  const [region, setRegion] = useState("Select");
  const [short, setShort] = useState("EN");
  const [show, setShow] = useState(false);

  const [logs] = useState("");
  const country = useUserCoutry();

  function printLogs(msg) {
    //You can uncomment these two lines to get the logs on the landingpage
    //globalLogs += '<br/>' + msg;
    //setLogs(globalLogs);
  }

  useEffect(() => {
    printLogs("LANGUAGE DETECTION LOGS:");
    setUserLocale(userLocaleX.substring(0, 2).toLowerCase());
    setUserRegion(userLocaleX.slice(-2).toLowerCase());
  }, [userLocaleX]);

  useEffect(() => {
    printLogs(
      "<br/>userLocale = " +
        userLocale +
        " | userRegion = " +
        userRegion +
        " | country = " +
        country
    );
    printLogs("- check for locale and region");
    if (userLocale === "id" || userRegion === "id") {
      printLogs("-- set as ID");
      setShort("ID");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(INDONESIA);
      setListOfLang([]);
    } else if (userLocale === "vi" || userRegion === "vn") {
      printLogs("-- set as VI");
      setShort("VI");
      setCurrentAppLocale(AppLocale["vi"]);
      setRegion(VIETNAM);
      setListOfLang([]);
    } else if (userLocale === "th" || userRegion === "th") {
      setShort("TH");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(THAILAND);
      setListOfLang([]);
    } else if (userLocale === "ms" || userRegion === "my") {
      printLogs("-- set as MY");
      setShort("EN");
      setCurrentAppLocale(AppLocale[userLocale]);
      setRegion(MALAYSIA);
      setListOfLang(["EN", "MS"]);
    } else if (userLocale === "en" || userRegion === "ph") {
      printLogs("-- set as PH");
      setShort("EN");
      setCurrentAppLocale(AppLocale["phEn"]);
      setRegion("Philippines");
      setListOfLang([]);
    } else {
      printLogs("- check by locale and region has failed");
      printLogs("- let's try with country");
      if (country === "id") {
        printLogs("-- set as ID thx to country");
        setShort("ID");
        setCurrentAppLocale(AppLocale["id"]);
        setRegion(INDONESIA);
        setListOfLang([]);
      } else if (country === "vn") {
        printLogs("-- set as VN thx to country");
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
        printLogs("- check by country has failed");
        printLogs("-- set as MY as default");
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
      logEvent(analytics, "trust_lp_my_chosen");
      setCurrentAppLocale(AppLocale["ms"]);
      setShort("MS");
      setListOfLang(["EN", "MS"]);
    } else if (lang === INDONESIA) {
      logEvent(analytics, "trust_lp_id_chosen");
      setCurrentAppLocale(AppLocale["id"]);
      setShort("ID");
      setListOfLang([]);
    } else if (lang === THAILAND) {
      logEvent(analytics, "trust_lp_th_chosen");
      setCurrentAppLocale(AppLocale["th"]);
      setShort("TH");
      setListOfLang([]);
    } else if (lang === "Philippines") {
      logEvent(analytics, "trust_lp_ph_chosen");
      setCurrentAppLocale(AppLocale["phEn"]);
      setShort("EN");
      setListOfLang([]);
    } else {
      logEvent(analytics, "trust_lp_vi_chosen");
      setCurrentAppLocale(AppLocale["vi"]);
      setShort("VN");
      setListOfLang([]);
    }
  };

  return (
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
              {region == MALAYSIA && <button onClick={() => setShow(!show)}>Take the shot!</button>}
              <DropDown
                list={listOfLang}
                region={short}
                onClick={handleLangPick}
              />
            </LangageContainer>
            {(region == MALAYSIA) && <Scribos/>}
            {!(region == MALAYSIA) && <div>
              <Logo region={region} />
              <Texts />
            </div>}
            {!show && <Download region={region} isIOS={isIOS} isMobile={isMobile} />}
            <div dangerouslySetInnerHTML={{ __html: logs }}></div>
            <br />
            <h1>{show ? "true" : "false"}</h1>
          </Background>
        </Theme>
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

export default App;
