import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPrice, setInitialState } from "../../../store/reducers/Mission/mission";
import tw from "twin.macro";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import KeypadInput from "../../../components/Mission/KeypadInput";

const CreateMissionPrice = () => {
  const [displayedNumber, setDisplayedNumber] = useState("0");

  const navigate = useNavigate();

  const requestData = useSelector((state) => state.mission);
  const dispatch = useDispatch();

  const handleLeftClick = () => {
    navigate("/mission/create");
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      dispatch(setInitialState());
      navigate("/mission");
    }
  };

  const handleNext = () => {
    if (isDisplayedNumberZero()) {
      alert("금액을 입력해주세요!");
    } else {
      dispatch(setPrice(parseInt(displayedNumber)));
      navigate("/mission/member");
    }
  };

  const isDisplayedNumberZero = () => displayedNumber === "0";

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} right={"취소"} onRightClick={handleRightClick} />
      <S.FormWrapper>
        <S.StepWrapper>
          <S.Question tw="text-[25px]">미션하면 얼마를 받을까요?</S.Question>
          <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} initialPrice={requestData.price} />
        </S.StepWrapper>

        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default CreateMissionPrice;
