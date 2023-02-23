import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logoid from "../helpers/svgs/logoid.svg";
import logomy from "../helpers/svgs/logomy.svg";
import logoph from "../helpers/svgs/logoph.svg";
import logoth from "../helpers/svgs/logoth.svg";
import logovi from "../helpers/svgs/logovi.svg";
import { INDONESIA, MALAYSIA, THAILAND, VIETNAM } from "../helpers/const";
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
