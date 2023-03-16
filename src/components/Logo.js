import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { INDONESIA, MALAYSIA, THAILAND, VIETNAM } from "../helpers/const";

const logoid = process.env.PUBLIC_URL + '/Assets/svg/logoid.svg';
const logomy = process.env.PUBLIC_URL + '/Assets/svg/logomy.svg';
const logoph = process.env.PUBLIC_URL + '/Assets/svg/logoph.svg';
const logoth = process.env.PUBLIC_URL + '/Assets/svg/logoth.svg';
const logovi = process.env.PUBLIC_URL + '/Assets/svg/logovi.svg';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImage = styled.img`
  max-height: 35vh;
  max-width: 90%;
  min-width: 200px;
  padding: 20px;
`;

const Logo = ({ region }) => {
  const [logo, setLogo] = useState(logomy);
  useEffect(() => {
    switch (region) {
      case INDONESIA:
        setLogo(logoid);
        break;
      case MALAYSIA:
        setLogo(logomy);
        break;
      case VIETNAM:
        setLogo(logovi);
        break;
      case THAILAND:
        setLogo(logoth);
        break;
      case "Philippines":
        setLogo(logoph);
        break;
      default:
        setLogo(logomy);
        break;
    }
  }, [region]);
  return (
    <LogoContainer>
      <LogoImage src={logo} />
    </LogoContainer>
  );
};

export default Logo;
