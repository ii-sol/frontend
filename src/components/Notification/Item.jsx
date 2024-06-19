import React from "react";
import { styled } from "styled-components";
import invest from "../../assets/img/Noti/invest.svg";

const Item = () => {
  return (
    <Container>
      <ImgWrapper>
        <Img src={invest} />
      </ImgWrapper>
      <ColumnDiv>
        <RowDiv>
          <Div>투자</Div>
          <Div>09:10</Div>
        </RowDiv>
        <Content>
          엄마가 종목 제안을 거절했어요. 거절 사유를 확인해보세요!
        </Content>
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
  box-shadow: 0px 0px 5px 0px rgba(255, 94, 94, 0.4);
  border-radius: 20px;
  height: 110px;
  margin: 10px 0px;
`;

const ImgWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img``;

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
