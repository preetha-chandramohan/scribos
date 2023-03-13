import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import getUserLocale from "get-user-locale";
import * as serviceWorker from "./serviceWorker";


const firebaseConfig = {
  apiKey: "AIzaSyBTLfxvzpgrKPRZkizqZLC4tSqPC60Fhog",
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
    {console.log(getUserLocale())}
    <App userLocaleX={getUserLocale()} />
  </React.StrictMode>
);

serviceWorker.unregister();