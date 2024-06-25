import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Indicator from "./Indicator";
import Chart from "./Chart";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

const SuggestionDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const companyInfo = useSelector((state) => state.suggestDetail.companyInfo);
  const requestProposal = useSelector(
    (state) => state.suggestDetail.requestProposal
  );
  const responseProposal = useSelector(
    (state) => state.suggestDetail.responseProposal
  );
  const loading = useSelector((state) => state.suggestDetail.loading);

  console.log(requestProposal);

  const formatDateToKorean = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  const formattedDate1 = formatDateToKorean(requestProposal?.createDate);
  const formattedDate2 = formatDateToKorean(responseProposal?.createDate);

  return (
    <Container>
      {loading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PuffLoader color="#4056c1" />
        </div>
      ) : (
        <>
          <NameDiv>{companyInfo.companyName}</NameDiv>
          <RowDiv>
            <DetailWrapper>
              <DetailDiv>시장가 : {companyInfo.currentPrice * 100}원</DetailDiv>
              <DetailDiv>수량 : {requestProposal.quantity}주</DetailDiv>
            </DetailWrapper>
            <S.TradeBadge $width="70px" $back={requestProposal.tradingCode}>
              {requestProposal.tradingCode === 1 ? "구매" : "판매"}
            </S.TradeBadge>
          </RowDiv>
          <Div
            style={{
              fontWeight: "600",
              fontSize: "22px",
              marginBottom: "5px",
              color: "#4c0065",
            }}
          >
            나의 제안 메시지
          </Div>
          <Div
            style={{
              fontWeight: "400",
              fontSize: "18px",
              marginBottom: "5px",
            }}
          >
            {requestProposal.message}
          </Div>
          <Div
            style={{
              textAlign: "right",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {formattedDate1}
          </Div>
          {requestProposal.status === 5 ? (
            <>
              <Div
                style={{
                  fontWeight: "600",
                  fontSize: "22px",
                  marginBottom: "5px",
                  color: "#4c0065",
                }}
              >
                부모님의 거절 메시지
              </Div>
              <Div
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  marginBottom: "5px",
                }}
              >
                {responseProposal?.message}
              </Div>
              <Div
                style={{
                  textAlign: "right",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {formattedDate2}
              </Div>
            </>
          ) : (
            <></>
          )}
          <Chart />
          <Indicator />
        </>
      )}
    </Container>
  );
};

export default SuggestionDetail;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #ffffffb7;
  box-shadow: 0px 0px 4px 0px #98c6ff;
  padding: 20px;
`;

const NameDiv = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const DetailDiv = styled.div`
  font-size: 20px;
`;

const Div = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
