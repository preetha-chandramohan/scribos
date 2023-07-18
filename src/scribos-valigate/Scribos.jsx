import React from "react";
import "@scribos/valigate/dist/index.css";
import "./Scribos.css";
import en from "./i18n/en.json";
import { NSForm } from "./NSForm";
import { NSThanks } from "./NSThanks";

import {
  initialize,
  scan,
  onResultReceived,
  EExitCodes,
  report
} from "@scribos/valigate";

import { Result } from "./Result";
import { Error } from "./Error";

function Scribos({short, region}) {
  const [error, setError] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [showNSForm, setShowNSForm] = React.useState(false);
  const [showThanks, setShowThanks] = React.useState(false);

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
      // "MDJN_STAGE_R1TL9G5Q2LXK924DK7QV",
      // "MDJN_PROD_476JR5HMS6GFJV73649K",
      // NEW PH
      "MDJN_STAGE_XK6ZV5XPGN1K50JJQDGP",
      // "MDJN_PROD_PJ98TGZ2XG5ZQZRP96X9",
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
        console.log("ExitCodes", exitCode);
        if (result) {
          setResult(result.SCAN_RESULT);
        }
        break;
      case EExitCodes.REQUESTED_REPORT:
        setShowNSForm(true);
        console.log("RESULT_REPORT", result);
        console.log("ExitCodes", exitCode);
        break;
      case EExitCodes.RESULT_REPORT:
        // alert(JSON.stringify(result, null, 2));
        if (result.REPORT_STATUS && result.REPORT_STATUS === 'success') {
          setShowThanks(true);
          setShowNSForm(false);
        }
        console.log("RESULT_REPORT", result);
        console.log("ExitCodes", exitCode);
        break;
      case EExitCodes.NON_VALIGATE_QR:
        setShowNSForm(true);
        console.log("NON_VALIGATE_QR", result);
        console.log("ExitCodes", exitCode);
        break;
      default:
        setError(exitCode);
        break;
    }
  }

  const sendReport = (data, fileList) => {
    const reportData = {
      "fields": data,
      "images": fileList,
    }
    if (data && reportData) {
      report(reportData);
    }
  }

  return (
    <div className="app">
      {/* <div className="header"></div> */}
      <div className="content">
        {error != null && <Error error={error} short={short}/>}
        {!error && !result && !showNSForm && !showThanks && <div id="valigate" className="valigate"></div>}
        {showNSForm && <div className="form">
          <NSForm sendReport={sendReport} />
        </div>}
        {showThanks && <div className="thankyou">
          <NSThanks />
        </div>}
        {result && <Result result={result} region={region}/>}
      </div>
    </div>
  );
}

export default Scribos;