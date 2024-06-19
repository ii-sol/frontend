import React from "react";
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";
import Item from "./Item";

const NotiList = () => {
  return (
    <S.Container>
      <Date>오늘</Date>
      <Hr />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Date>오늘</Date>
      <Hr />
      <Item />
      <Item />
    </S.Container>
  );
};

export default NotiList;

const Date = styled.div`
  color: #949494;
  margin-top: 30px;
`;

const Hr = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #949494;
  border: 0;
`;
