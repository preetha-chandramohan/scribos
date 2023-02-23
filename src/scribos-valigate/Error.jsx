import * as React from "react";


const BlockScreen = ({ title, text }) => {
  return (
    <div className="block-screen">
      {title && <div className="block-screen__title">{title}</div>}
      <div className="block-screen__content">
        <div className="block-screen__content-text">{text}</div>
      </div>
    </div>
  );
};


export const Error = ({ error }) => {
  return <BlockScreen text={error} />;
};
