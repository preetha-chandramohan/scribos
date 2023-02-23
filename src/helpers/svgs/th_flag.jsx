import * as React from "react";

const THFlag = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <path
      style={{
        fillRule: "evenodd",
        fill: "#fff",
      }}
      d="M-77.953 296.18h900v100h-900zM-77.953 596.18h900v100h-900z"
      transform="translate(77.953 -196.18)"
    />
    <path
      style={{
        fill: "#de1018",
        fillRule: "evenodd",
      }}
      d="M-77.953 696.18h900v100h-900zM-77.953 196.18h900v100h-900z"
      transform="translate(77.953 -196.18)"
    />
    <path
      style={{
        fillRule: "evenodd",
        fill: "#00247d",
      }}
      d="M-77.953 396.18h900v200h-900z"
      transform="translate(77.953 -196.18)"
    />
  </svg>
);

export default THFlag;
