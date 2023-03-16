import styled from "styled-components";
import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

const InjectMassage = (props) => <FormattedMessage {...props} />;

export const InjectMsg = injectIntl(InjectMassage, {
  withRef: false,
});

export const Background = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const LangageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-right: 20em;
  }
`;

