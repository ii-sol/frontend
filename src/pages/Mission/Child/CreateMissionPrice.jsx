import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/NormalizeNumber";

import Header from "~/components/common/Header";
import KeypadInput from "../../../components/Allowance/KeypadInput";

const CreateMissionPrice = () => {
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [requestData, setRequestData] = useState({
    content: "",
    childId: "",
    parentId: "",
    price: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (isDisplayedNumberZero()) {
      alert("금액을 입력해주세요!");
    } else {
      setRequestData({
        ...requestData,
        price: parseInt(displayedNumber),
      });
      navigate("/mission/member");
    }
  };

  const isDisplayedNumberZero = () => displayedNumber === "0";

  return (
    <S.Container>
      <Header left={"<"} title={"미션"} right={"취소"} />
      <S.FormWrapper>
        <S.StepWrapper>
          <S.Question tw="text-[25px]">미션하면 얼마를 받을까요?</S.Question>
          <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} />
        </S.StepWrapper>

        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default CreateMissionPrice;
