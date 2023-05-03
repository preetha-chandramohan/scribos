import * as React from "react";
import styled from "styled-components";
import { isIOS } from "react-device-detect";

const Container = styled.div`
display: flex;
flex-direction: column;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
padding: 0px 38px;`

const Title = styled.h1`
color: rgb(30, 45, 105);
text-align: center;
font-weight: bold;
font-size: 34px;`

const Para = styled.p`
text-align: center;
color: rgb(30, 45, 105);
font-size: 21px;
margin: 0px;`

const lang = {
  MS : {
    title: "Terima kasih untuk imbasan.",
    subtitle: "Sila klik butang Buka di atas untuk meneruskan"
  },
  EN : {
    title: "Thank you for scanning.",
    subtitle: "Please click “Open” button above to continue"
  }
}

const BlockScreen = ({ title, text, short }) => {
  return (
    <>
      {console.log(text)}
      {
        text === 'UNSUPPORTED_BROWSER' && isIOS ?
          <Container> 
            <Title>{lang[short]['title']}</Title>
            <Para>{lang[short]['subtitle']}</Para>
          </Container> :
          <div className="block-screen">
            {title && <div className="block-screen__title">{title}</div>}
            <div className="block-screen__content">
              <div className="block-screen__content-text">{text}</div>
            </div>
          </div>
      }
    </>
  );
};

export const Error = ({ error, short }) => {
  return <BlockScreen text={error} short={short}/>;
};
