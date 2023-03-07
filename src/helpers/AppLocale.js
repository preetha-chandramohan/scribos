import { enMY, enPH, enUS, idID, msMY, thTH, viVN } from "./localeConst";
const myEnLang = {
  messages: {
    ...enMY,
  },
  locale: "en-MY",
};
const phEnLang = {
  messages: {
    ...enPH,
  },
  locale: "en-PH",
};
const enLang = {
  messages: {
    ...enUS,
  },
  locale: "en-US",
};
const idLang = {
  messages: {
    ...idID,
  },
  locale: "id-ID",
};
const myLang = {
  messages: {
    ...msMY,
  },
  locale: "ms-MY",
};
const thLang = {
  messages: {
    ...thTH,
  },
  locale: "th-TH",
};
const viLang = {
  messages: {
    ...viVN,
  },
  locale: "vi-VN",
};

const AppLocale = {
  en: enLang,
  ms: myLang,
  myEn: myEnLang,
  phEn: phEnLang,
  id: idLang,
  vi: viLang,
  th: thLang,
};

export default AppLocale;