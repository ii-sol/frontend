import React from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { normalizeNumber } from "../../utils/normalizeNumber";

// TODO: 보유잔고, 주문 가능 수량(잔고 / price)
const StocksAbout = () => {
  const name = useSelector((state) => state.invest.name);
  const trade = useSelector((state) => state.invest.trade);
  const price = useSelector((state) => state.invest.price);
  const balance = useSelector((state) => state.account.balance2);
  const code = useSelector((state) => state.invest.code);
  console.log("ba", balance);
  const maxQuantity = Math.floor(balance / price);
  const investTradeList = useSelector(
    (state) => state.portfolio.investTradeList
  );

  const matchingTrade = investTradeList.find((trade) => trade.ticker === code);
  const quantity = matchingTrade ? matchingTrade.quantity : null;
  const evaluatePrice = quantity * price;

  return (
    <Container>
      <RowDiv>
        <InfoDiv>종목</InfoDiv>
        <InfoDiv>{name}</InfoDiv>
      </RowDiv>
      <RowDiv>
        <InfoDiv>시장가</InfoDiv>
        <InfoDiv>{normalizeNumber(price)}원</InfoDiv>
      </RowDiv>
      {trade === 1 ? (
        <>
          <RowDiv>
            <InfoDiv>보유잔고</InfoDiv>
            <InfoDiv>{normalizeNumber(balance)}원</InfoDiv>
          </RowDiv>
          <RowDiv>
            <InfoDiv>구매가능수량</InfoDiv>
            <InfoDiv>최대 {maxQuantity}주</InfoDiv>
          </RowDiv>
        </>
      ) : (
        <>
          <RowDiv>
            <InfoDiv>나의 평가금액</InfoDiv>
            <InfoDiv>{normalizeNumber(evaluatePrice)}원</InfoDiv>
          </RowDiv>
          <RowDiv>
            <InfoDiv>판매가능수량</InfoDiv>
            <InfoDiv>최대 {quantity}주</InfoDiv>
          </RowDiv>
        </>
      )}
    </Container>
  );
};

export default StocksAbout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #cde1ff;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #0974b1;
  font-size: 16px;
`;

const InfoDiv = styled.div``;
