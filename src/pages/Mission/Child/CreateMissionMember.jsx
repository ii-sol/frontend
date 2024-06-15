import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setParentId } from "../../../store/reducers/Mission/mission";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";

import ChildImage from "~/assets/img/Auth/child.svg";

const CreateMissionMember = () => {
  const navigate = useNavigate();

  const requestData = useSelector((state) => state.mission);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!requestData.parentId) {
      alert("부모님을 선택해주세요!");
    } else {
      //TODO : 폼 제출 로직
      navigate("/mission/complete");
    }
  };

  const handleMemberChange = (name, phoneNum) => {
    dispatch(setParentId(3)); //TODO: parentId 저장해야 함
  };

  return (
    <S.Container>
      <Header left={"<"} title={"미션"} right={"취소"} />
      <S.FormWrapper>
        <S.StepWrapper>
          <S.Question tw="text-[25px]">누구에게 미션을 요청할까요?</S.Question>
          <MemberContainer>
            <Member img={ChildImage} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
            <Member img={ChildImage} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("아빠", "010-4321-4321")}></Member>
          </MemberContainer>
        </S.StepWrapper>
        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>{" "}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default CreateMissionMember;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;
