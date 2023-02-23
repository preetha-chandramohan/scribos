import React from "react";
import styled from "styled-components";
import InjectMassage from "./IntlMessage";

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 38px 0 38px;
`;

const FirstText = styled.p`
  color: ${(props) => props.theme.colors.fontColor};
  text-align: center;
  font-weight: bold;
  font-size: 34px;
  margin-bottom: 30;
`;

const SecondText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.fontColor};
  font-size: 21px;
  margin: 0;
`;

const Texts = () => {
  return (
    <TextsContainer>
      <FirstText>
        <InjectMassage id="general.text1" />
      </FirstText>
      <SecondText>
        <InjectMassage id="general.text2" />
      </SecondText>
    </TextsContainer>
  );
};

export default Texts;
