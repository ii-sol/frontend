import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/NormalizeNumber";

import DishwashingImg from "~/assets/img/Mission/dishwashing.svg";

import Header from "~/components/common/Header";

const MissionDetail = () => {
  return (
    <S.Container>
      <Header left={"<"} title={"미션"} right={""} />
      <S.StepWrapper>
        <CompleteContainer>
          <StatusTag>진행중</StatusTag>
          <Img src={DishwashingImg} alt="mission" />
          <S.Question>엄마의 미션</S.Question>
          <S.CompleteCard>
            <div>방 청소하기</div>
            <div tw="text-[#154B9B]">{normalizeNumber(10000)}원</div>
          </S.CompleteCard>
          <div tw="text-xs font-bold">
            미션 완료일 :<span tw="text-[#154B9B]">2024.06.13목</span>
          </div>
        </CompleteContainer>
        <S.BottomBtnWrapper>
          <S.rejectBtn>그만하기</S.rejectBtn>
          <S.acceptBtn>완료하기</S.acceptBtn>
        </S.BottomBtnWrapper>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MissionDetail;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-14
  gap-2`}
`;

const StatusTag = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #346bac;
  background-color: #d5e0f1;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 80%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;
