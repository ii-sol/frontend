import React from "react";
import { styled } from "styled-components";
import allowance from "~/assets/img/Noti/allowance.svg";
import etc from "~/assets/img/Noti/etc.svg";
import invest from "~/assets/img/Noti/invest.svg";
import loan from "~/assets/img/Noti/loan.svg";
import mission from "~/assets/img/Noti/mission.svg";

const Item = ({ data }) => {
  let type;
  let functionText;
  let boxShadowColor;
  switch (data.functionCode) {
    case 1:
      type = etc;
      functionText = "회원";
      boxShadowColor = "rgba(123, 123, 123, 0.8)";
      break;
    case 2:
      type = etc;
      functionText = "송금";
      boxShadowColor = "rgba(123, 123, 123, 0.8)";
      break;
    case 3:
      type = allowance;
      functionText = "용돈";
      boxShadowColor = "rgba(116, 161, 94, 0.8)";
      break;
    case 4:
      type = mission;
      functionText = "미션";
      boxShadowColor = "rgba(201, 193, 0, 0.8)";
      break;
    case 5:
      type = loan;
      functionText = "대출";
      boxShadowColor = "rgba(250, 176, 238, 0.8)";
      break;
    case 6:
      type = invest;
      functionText = "투자";
      boxShadowColor = "rgba(255, 94, 94, 0.8)";
      break;
    default:
      type = etc;
      functionText = "기타";
      boxShadowColor = "rgba(123, 123, 123, 0.8)";
  }

  const createDate = new Date(data.createDate);
  const timeString = `${createDate.getHours()}:${(
    "0" + createDate.getMinutes()
  ).slice(-2)}`;

  return (
    <Container $boxShadowColor={boxShadowColor}>
      <ImgWrapper>
        <Img src={type} alt="function icon" />
      </ImgWrapper>
      <ColumnDiv>
        <RowDiv>
          <Div>{functionText}</Div>
          <Div>{timeString}</Div>
        </RowDiv>
        <Content>{data.messageCode}</Content>
      </ColumnDiv>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #fcfdff;
  padding: 20px;
  box-shadow: 0px 0px 6px 0px ${(props) => props.$boxShadowColor};
  border-radius: 20px;
  height: 110px;
  margin: 20px 0px;
`;

const ImgWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 15px;
  gap: 5px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  color: #154b9b;
  font-weight: 700;
`;

const Content = styled.div`
  font-weight: 500;
`;
