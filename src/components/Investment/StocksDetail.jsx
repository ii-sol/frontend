import React, { useState, useEffect } from "react";
import * as S from "../../styles/GlobalStyles";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Indicator from "./Indicator";
import CandleChart from "./CandleChart";
import { useDispatch, useSelector } from "react-redux";
import { setTrade } from "../../store/reducers/Invest/invest";

const StocksDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = useSelector((state) => state.invest.code);
  const name = useSelector((state) => state.invest.name);
  const price = useSelector((state) => state.invest.price);
  const changePrice = useSelector((state) => state.invest.changePrice);
  const changeRate = useSelector((state) => state.invest.changeRate);

  console.log(code);

  return (
    <Container>
      <RowDiv>
        <HeaderDiv>
          <StockDiv>{name}</StockDiv>
          <S.ColumnDiv>
            <PriceDiv>{price}원</PriceDiv>
            <PriceDiv>
              ▲{changePrice} +{changeRate}%
            </PriceDiv>
          </S.ColumnDiv>
        </HeaderDiv>
      </RowDiv>
      <CandleChart />
      <InfoDiv>투자 지표</InfoDiv>
      <Indicator />
      <RowDiv $center="center" $top="20" $gap="20">
        <S.BuyBtn
          $background="#FF5959"
          onClick={() => {
            navigate("/invest/trading");
            dispatch(setTrade(0));
          }}
        >
          구매하기
        </S.BuyBtn>
        <S.BuyBtn
          $background="#5987ff"
          onClick={() => {
            navigate("/invest/trading");
            dispatch(setTrade(1));
          }}
        >
          판매하기
        </S.BuyBtn>
      </RowDiv>
    </Container>
  );
};

export default StocksDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-bottom: 15px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$center ? props.$center : "space-between"};
  align-items: center;
  margin-top: ${(props) => (props.$top ? props.$top : "10")}px;
  gap: ${(props) => (props.$gap ? props.$gap : "10")}px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const PriceDiv = styled.div`
  text-align: right;
`;

const StockDiv = styled.div`
  font-size: 25px;
`;

const InfoDiv = styled.div`
  text-align: left;
  font-size: 20px;
`;
