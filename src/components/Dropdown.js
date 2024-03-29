import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  INDONESIA,
  MALAYSIA,
  PHILIPPINES,
  THAILAND,
  VIETNAM,
} from "../helpers/const";

const arrow = process.env.PUBLIC_URL + '/Assets/svg/arrow-down.svg';
const id_flag = process.env.PUBLIC_URL + '/Assets/svg/id_flag.svg';
const my_flag = process.env.PUBLIC_URL + '/Assets/svg/my_flag.svg';
const ph_flag = process.env.PUBLIC_URL + '/Assets/svg/ph_flag.svg';
const th_flag = process.env.PUBLIC_URL + '/Assets/svg/th_flag.svg';
const vi_flag = process.env.PUBLIC_URL + '/Assets/svg/vi_flag.svg';

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: inline-block;
  color: black;
  font-size: 15px;
  background: ${(props) => props.theme.colors.dropdownColor};
  text-align: center;
  padding: 14px 16px;
  margin: 0 16px;
  border-radius: 15px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  border-radius: 15px;
  background: ${(props) => props.theme.colors.dropdownColor};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  margin: ${(props) => (props.withFlag ? "0 16px" : "0 -4em")};
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
    border-radius: 15px;
  }
`;

const Flag = styled.img`
  padding-right: 14px;
  width: 37px;
  height: 19px;
`;

const DropDown = ({ withFlag, onClick, region = MALAYSIA, list }) => {
  const [flag, setFlag] = useState(my_flag);
  useEffect(() => {
    switch (region) {
      case MALAYSIA:
        setFlag(my_flag);
        break;
      case INDONESIA:
        setFlag(id_flag);
        break;
      case VIETNAM:
        setFlag(vi_flag);
        break;
      case THAILAND:
        setFlag(th_flag);
        break;
      case PHILIPPINES:
        setFlag(ph_flag);
        break;
      default:
        break;
    }
  }, [region]);
  const handleClick = (action) => {
    if (!action) return;

    if (onClick) onClick(action);
  };
  return (
    <DropDownLi>
      <Dropbtn>
        {withFlag && <Flag src={flag} />} {region}{" "}
        <img src={arrow} alt="arrow" />
      </Dropbtn>
      <DropDownContent withFlag={withFlag}>
        {list.map((i) => (
          <SubA key={i} onClick={() => handleClick(i)}>
            {i}
          </SubA>
        ))}
      </DropDownContent>
    </DropDownLi>
  );
};

export default DropDown;
