import * as React from "react";
import { MalaysiaUI } from "./MalaysiaUI";
import { MalaysiaStageUI } from "./MalaysiaStageUI";

export const Result = ({ result }) => {
  return (
    <div className="result">
      <div className="result__status" style={{ background: result.validity.color }}>
        {result.validity.description_translated}
      </div>
      {
        result.attributes &&
        result.attributes.rfxcel_product_name.values[0].value.toUpperCase().includes('ENFALAC') &&
        <MalaysiaUI result={result.attributes} />
      }
      {
        result.attributes &&
        result.attributes.rfxcel_product_name.values[0].value.toUpperCase().includes('ENFAGROW') &&
        result.attributes && <MalaysiaStageUI result={result.attributes} />
      }
    </div>
  );
};
