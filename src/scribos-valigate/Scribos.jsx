import React from "react";
import "@scribos/valigate/dist/index.css";
import "./Scribos.css";
import en from "./i18n/en.json";

import {
  initialize,
  scan,
  onResultReceived,
  EExitCodes,
} from "@scribos/valigate";

import { Result } from "./Result";
import { Error } from "./Error";

function App() {
  const [error, setError] = React.useState(null);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    // adjust vertical height (handles mobile browsers)
    // see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  React.useEffect(() => {
    initialize(
      "valigate",
      // "<ENTER_THE_APP_ID_PROVIDED_BY_SCRIBOS_HERE>",
      "MDJN_STAGE_R1TL9G5Q2LXK924DK7QV",
      `${process.env.PUBLIC_URL}/valigate/worker.f029c5c.js`,
      en
    );
    onResultReceived(handleResult);
    scan();
  }, []);

  function handleResult(exitCode, result) {
    switch (exitCode) {
      case EExitCodes.RESULT_SINGLE_SCAN:
        console.log("RESULT_SINGLE_SCAN", result);
        if (result) {
          setResult(result.SCAN_RESULT);
        }
        break;
      case EExitCodes.REQUESTED_REPORT:
        console.log("REQUESTED_REPORT");
        break;
      case EExitCodes.RESULT_REPORT:
        console.log("RESULT_REPORT", result);
        break;
      case EExitCodes.NON_VALIGATE_QR:
        console.log("NON_VALIGATE_QR", result);
        break;
      default:
        setError(exitCode);
        break;
    }
  }

  return (
    <div className="app">
      <div className="header">BRAND</div>
      <div className="content">
        {error && <Error error={error} />}
        {!error && !result && <div id="valigate" className="valigate"></div>}
        {result && <Result result={result} />}
      </div>
      <div className="footer">© COMPANY 2022</div>
    </div>
  );
}

export default App;
