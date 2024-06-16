import React from "react";
import Header from "../../../components/Investment/Header";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import Good from "../../../assets/img/common/Good.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Done = () => {
  const parent = useSelector((state) => state.invest.parent);
  const isNew = useSelector((state) => state.invest.isNew);
  const trade = useSelector((state) => state.invest.trade);
  const name = useSelector((state) => state.invest.name);
  const quantity = useSelector((state) => state.invest.quantity);
  const price = useSelector((state) => state.invest.price);
  const myAmount = useSelector((state) => state.invest.myAmount);
  const navigate = useNavigate();
  return (
    <S.Container>
      <Header type="none" />
      <S.CenterDiv>
        <Img src={Good} />
        {isNew ? <Div>제안 완료</Div> : <Div>거래 완료</Div>}
        <Box>
          {isNew ? (
            <Message>
              {parent} 님에게 <br /> 투자 제안서를 보냈습니다!
            </Message>
          ) : (
            <Message $trade={trade}>
              {name} {quantity}주<br />
              <span>{trade === 0 ? "구매 " : "판매 "}</span>
              완료했습니다.
              <br />
              주문 단가 {price}원 <br />총 {myAmount}원
            </Message>
          )}
        </Box>
        <S.BottomBtn onClick={() => navigate("/invest")}>완료</S.BottomBtn>
      </S.CenterDiv>
    </S.Container>
  );
};

export default Done;

const Img = styled.img``;

const Div = styled.div`
  font-size: 25px;
  text-align: center;
  margin-top: -20px;
  font-weight: 600;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 150px;
  background-color: #f0f7ff;
  border-radius: 1 5px;
`;

const Message = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 30px;

  span {
    color: ${(props) => (props.$trade === 0 ? "#FF5959" : "#1573FE")};
  }
`;
