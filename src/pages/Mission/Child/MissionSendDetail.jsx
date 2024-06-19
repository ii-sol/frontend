import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/normalizeNumber";

import MissionImage from "~/assets/img/common/sdamSol.svg";

import Header from "~/components/common/Header";

const MissionSendDetail = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/mission");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} right={""} />
      <S.StepWrapper>
        <CompleteContainer>
          <S.Question>수락을 기다리고 있어요!</S.Question>
          <Img src={MissionImage} alt="mission" />
          <S.Question>엄마</S.Question>
          <S.CompleteCard>
            <div>"책상 정리하기"</div>
            <div tw="text-[#154B9B]">{normalizeNumber(10000)}원</div>
            <div tw="text-base">미션 완료일 : 2024-06-13</div>
          </S.CompleteCard>
          <div tw="text-sm font-bold">
            <span tw="text-[#154B9B]">2024.06.9일</span> 까지 응답하지 않으면 취소돼요
          </div>
        </CompleteContainer>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MissionSendDetail;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-12
  gap-2`}
`;

const Img = styled.img`
  width: 40%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;
