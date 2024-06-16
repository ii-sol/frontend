import React from "react";
import { styled } from "styled-components";

const Indicator = () => {
  return (
    <div>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>시가총액</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>배당수익률</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>PBR</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
      </RowDiv>
      <RowDiv>
        <BoxDiv>
          <AboutDiv>PER</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>ROE</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
        <BoxDiv>
          <AboutDiv>PSR</AboutDiv>
          <ContentDiv>153조원</ContentDiv>
        </BoxDiv>
      </RowDiv>
    </div>
  );
};

export default Indicator;

const RowDiv = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$center ? props.$center : "space-between"};
  align-items: center;
  margin-top: ${(props) => (props.$top ? props.$top : "10")}px;
  gap: ${(props) => (props.$gap ? props.$gap : "10")}px;
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 106px;
  height: 75px;
  border-radius: 15px;
  background: #ebf5ff;
`;

const AboutDiv = styled.div`
  color: #6a6a6a;
  font-size: 13px;
`;

const ContentDiv = styled.div`
  font-size: 15px;
`;
