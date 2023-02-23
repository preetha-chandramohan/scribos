import styled from "styled-components";

const LangageContainer = styled.div`
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

export default LangageContainer;
