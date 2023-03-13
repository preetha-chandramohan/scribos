import * as React from "react";
import { MalaysiaUI } from "./MalaysiaUI";
import { MalaysiaStageUI } from "./MalaysiaStageUI";

export const Result = ({ result }) => {
  return (
    <div className="result">
      <div className="result__status" style={{ background: result.validity.color }}>
        {result.validity.description_translated}
      </div>
      {console.log(Object.keys(result.attributes))}
      <div>
        {/* {Object.keys(result.attributes)
          .filter(
            (attribute) => attribute === "rfxcel_product_image")
          .map((attribute) => (
            <img width="200px" alt="product"
              key={attribute}
              // image data coming from rfxcel are always in the jpeg format
              src={`data:image/jpeg;base64,${result.attributes[attribute].values[0].value}`}
            />
          ))} */}
      </div>
      <div>
        {/* {Object.keys(result.attributes)
          .filter(
            (attribute) => attribute !== "rfxcel_product_image")
          .map((attribute) => (
            <p key={attribute}>
              <strong>{attribute}</strong> {result.attributes[attribute].values[0].value}
            </p>
          ))} */}
      </div>
      <div>
        {/* {result.verification_attributes
          .filter(
            (attribute) =>
              attribute.type === "table" &&
              attribute.value !== "N/A" &&
              attribute.value !== null,
          )
          .sort((a, b) => a.position - b.position)
          .map((attribute) => (
            <p key={attribute.name}>
              <strong>{attribute.display_name}</strong> {attribute.value}
            </p>
          ))} */}
      </div>
      {
        result.attributes &&
        result.attributes.rfxcel_product_name.values[0].value.toUpperCase().includes('ENFALAC') &&
        <MalaysiaUI result={result.attributes}/>
      }
      {
        result.attributes &&
        result.attributes.rfxcel_product_name.values[0].value.toUpperCase().includes('ENFAGROW') &&
        result.attributes && <MalaysiaStageUI result={result.attributes}/>
      }
    </div>
  );
};
