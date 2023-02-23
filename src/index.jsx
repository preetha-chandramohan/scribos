import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import getUserLocale from "get-user-locale";
import * as serviceWorker from "./serviceWorker";
// import Scribos from "./scribos-valigate/Scribos";

const firebaseConfig = {
  apiKey: "AIzaSyBTLfxvzpgrKPRZkizqZLC4tSqPC60Fhog-testtss",
  authDomain: "enfamobileapp.firebaseapp.com",
  databaseURL: "https://enfamobileapp.firebaseio.com",
  projectId: "enfamobileapp",
  storageBucket: "enfamobileapp.appspot.com",
  messagingSenderId: "543795203219",
  appId: "1:543795203219:web:f90eb04a2de5aa5a5b5166",
  measurementId: "G-Z2DJZEXYF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };

logEvent(analytics, "trust_lp_opened");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App userLocaleX={getUserLocale()} />
    {/* <Scribos /> */}
  </React.StrictMode>
);

serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
