import { logEvent } from "firebase/analytics";
import React from "react";
import styled from "styled-components";
import {
  ANDROID,
  ID_APPSTORE,
  ID_GOOGLEPLAY,
  INDONESIA,
  IOS,
  MALAYSIA,
  MY_APPSTORE,
  MY_GOOGLEPLAY,
  PH_APPSTORE,
  PH_GOOGLEPLAY,
  THAILAND,
  TH_STORE,
  VIETNAM,
  VI_APPSTORE,
  VI_GOOGLEPLAY,
} from "../helpers/const";
import { analytics } from "../index";
import { InjectMsg } from "../helpers/styled";

const googlePlay = process.env.PUBLIC_URL + '/Assets/svg/googleplay.svg';
const appStore = process.env.PUBLIC_URL + '/Assets/svg/AppStore.svg';

const DownloadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 7em;
`;

const ShopImage = styled.img`
  width: 180px;
  margin-right: ${(props) => (props.right ? "10px" : "0px")};
  margin-left: ${(props) => (props.left ? "10px" : "0px")};
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.fontColor};
`;

const Download = ({ isMobile, isIOS, region }) => {
  const handleClickShop = (event, shop) => {
    event.preventDefault();
    var appleUrl;
    var googleUrl;
    switch (region) {
      case MALAYSIA:
        logEvent(analytics, `trust_lp_my_get_${shop}`);
        appleUrl = MY_APPSTORE;
        googleUrl = MY_GOOGLEPLAY;
        break;
      case VIETNAM:
        logEvent(analytics, `trust_lp_vi_get_${shop}`);
        appleUrl = VI_APPSTORE;
        googleUrl = VI_GOOGLEPLAY;
        break;
      case THAILAND:
        logEvent(analytics, `trust_lp_th_get_${shop}`);
        appleUrl = TH_STORE;
        googleUrl = TH_STORE;
        break;
      case INDONESIA:
        logEvent(analytics, `trust_lp_id_get_${shop}`);
        appleUrl = ID_APPSTORE;
        googleUrl = ID_GOOGLEPLAY;
        break;
      case "Philippines":
        logEvent(analytics, `trust_lp_ph_get_${shop}`);
        appleUrl = PH_APPSTORE;
        googleUrl = PH_GOOGLEPLAY;
        break;
      default:
        logEvent(analytics, `trust_lp_my_get_${shop}`);
        appleUrl = MY_APPSTORE;
        googleUrl = MY_GOOGLEPLAY;
    }
    if (shop === "ios") {
      window.open(appleUrl, "_blank");
    } else {
      window.open(googleUrl, "_blank");
    }
  };
  return (
    <DownloadContainer>
      <Text>
        <InjectMsg id="general.text3" />
      </Text>
      {isMobile ? (
        isIOS ? (
          <ShopImage
            alt={"apple"}
            onClick={(e) => handleClickShop(e, IOS)}
            src={appStore}
          />
        ) : (
          <ShopImage
            alt={"googlePlay"}
            onClick={(e) => handleClickShop(e, ANDROID)}
            src={googlePlay}
          />
        )
      ) : (
        <Flex>
          <ShopImage
            alt={"apple"}
            onClick={(e) => handleClickShop(e, IOS)}
            right
            src={appStore}
          />
          <ShopImage
            alt={"googlePlay"}
            onClick={(e) => handleClickShop(e, ANDROID)}
            left
            src={googlePlay}
          />
        </Flex>
      )}
    </DownloadContainer>
  );
};

export default Download;
