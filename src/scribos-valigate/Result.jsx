import * as React from "react";


export const Result = ({ result }) => {
  return (
    <div className="result">
      <div className="result__status" style={{ background: result.validity.color }}>
        {result.validity.description_translated}
      </div>
      <div>
        {result.verification_attributes
          .filter(
            (attribute) =>
              attribute.type === "image" && attribute.value != null,
          )
          .map((image) => (
            <img width="200px" alt="product"
              key={image.name}
              src={image.value}
            />
          ))}
      </div>
      <div>
        {result.verification_attributes
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
          ))}
      </div>
    </div>
  );
};
