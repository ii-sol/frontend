import React, { useState } from "react";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { BottomSheet } from "react-spring-bottom-sheet";
import StocksDetail from "../../../components/Investment/StocksDetail";
import "react-spring-bottom-sheet/dist/style.css";

const AvailableInvest = () => {
  const [open, setOpen] = useState(false);
  const handleDismiss = () => {
    setOpen(false);
  };
  return (
    <S.Container>
      <Header />
      <TitleDiv>거래 가능 종목 리스트</TitleDiv>
      <Box>
        <Wrapper>
          <StockDiv>
            <StockName>삼성전자</StockName>
          </StockDiv>
          <HoldingDiv>
            <CurrentPrice>1521000원</CurrentPrice>
            <ChangeRate>- 152,721</ChangeRate>
          </HoldingDiv>
          <DeleteDiv>
            <FaRegTrashAlt size="30" />
          </DeleteDiv>
        </Wrapper>
      </Box>
      <S.BottomBtn onClick={() => setOpen(!open)}>새 종목 추가하기</S.BottomBtn>
      <BottomSheet open={open} onDismiss={handleDismiss}>
        <StocksDetail />
      </BottomSheet>
    </S.Container>
  );
};

export default AvailableInvest;

const TitleDiv = styled.div`
  font-size: 25px;
  text-align: center;
  margin: 10px auto;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10px;
  height: ${screen.height - 210}px;
`;

const HoldingDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: #154b9b;
  gap: 5px;
  flex: 1;
  text-align: right;
`;

const DeleteDiv = styled.div`
  display: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dceeff;
  border-radius: 15px;
  padding: 15px;
  height: 80px;
  margin-bottom: 10px;

  &:hover > ${HoldingDiv} {
    display: none;
  }

  &:hover > ${DeleteDiv} {
    display: flex;
    margin-right: 0px;
  }
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const StockName = styled.div`
  font-size: 25px;
`;

const CurrentPrice = styled.div`
  font-size: 25px;
`;

const ChangeRate = styled.div`
  font-size: 17px;
  text-align: right;
`;
