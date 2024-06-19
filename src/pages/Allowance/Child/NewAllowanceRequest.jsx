import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/normalizeNumber";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";
import Message from "~/components/common/Message";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";

import MessageImage from "~/assets/img/common/message.svg";
import AllowanceImage from "~/assets/img/Allowance/allowance.svg";
import KeypadInput from "../../../components/Allowance/KeypadInput";

const initialState = {
  childPhone: "",
  parentPhone: "",
  amount: "",
  content: "",
};

const NewAllowanceRequest = () => {
  const [step, setStep] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [message, setMessage] = useState("");
  const [requestData, setRequestData] = useState(initialState);

  const navigate = useNavigate();

  const today = new Date();
  const dueDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  const year = dueDate.getFullYear();
  const month = (dueDate.getMonth() + 1).toString().padStart(2, "0");
  const day = dueDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const handleNext = () => {
    let error = "";

    switch (step) {
      case 0:
        if (!requestData.parentPhone) {
          error = "부모님을 선택해주세요!";
        }
        break;
      case 1:
        if (isDisplayedNumberZero()) {
          error = "금액을 입력해주세요!";
        } else {
          setRequestData({
            ...requestData,
            amount: parseInt(displayedNumber),
          });
          setStep(step + 1);
        }
        break;
      case 2:
        if (!requestData.content) {
          error = "메세지를 입력해주세요!";
        } else {
          setRequestData({
            ...requestData,
            content: message,
          });
        }
        break;
      default:
        break;
    }

    if (error) {
      alert(error);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 0) {
      navigate("/allowance/irregular");
    } else if (step < 3) {
      setStep(step - 1);
    } else {
      navigate("/allowance/irregular");
    }
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      setRequestData(initialState);
      navigate("/allowance/irregular");
    }
  };

  const handleMemberChange = (name, phoneNum) => {
    setRequestData({
      ...requestData,
      parentName: name,
      parentPhone: phoneNum,
    });
  };

  const isDisplayedNumberZero = () => displayedNumber === "0";

  const handleInputChange = (message) => {
    setMessage(message);
    setRequestData({
      ...requestData,
      content: message,
    });
  };

  const handleAllowanceRedirect = () => {
    navigate("/allowance/irregular");
  };

  return (
    <S.Container>
      <Header
        left={"<"}
        onLeftClick={handlePrev}
        title={"용돈 조르기"}
        right={step < 3 ? "취소" : null}
        onRightClick={step < 3 ? handleRightClick : null}
      />
      <S.FormWrapper>
        {step === 0 && (
          <S.StepWrapper>
            <S.Question>누구에게 용돈을 부탁드릴까요?</S.Question>
            <MemberContainer>
              <Member
                img={CharacterImage1}
                name="박지민"
                role="부모"
                phoneNum="010-0000-0000"
                onClick={() => handleMemberChange("박지민", "010-0000-0000")}
              ></Member>
              <Member img={CharacterImage2} name="엄마" role="부모"></Member>
              <Member
                img={CharacterImage1}
                name="아빠"
                role="부모"
                phoneNum="010-4321-4321"
                onClick={() => handleMemberChange("아빠", "010-4321-4321")}
              ></Member>
            </MemberContainer>
          </S.StepWrapper>
        )}
        {step === 1 && (
          <S.StepWrapper>
            <S.Question>얼마를 달라고 부탁드릴까요?</S.Question>
            <KeypadInput
              displayedNumber={displayedNumber}
              setDisplayedNumber={setDisplayedNumber}
            />
          </S.StepWrapper>
        )}
        {step === 2 && (
          <S.StepWrapper>
            <div style={{ margin: "20px" }}>
              <S.Question style={{ margin: 0 }}>
                {requestData.parentName} 님에게
              </S.Question>
              <S.Question style={{ margin: 0 }}>
                {normalizeNumber(requestData.amount)}원을 부탁드릴게요
              </S.Question>
              <SmallPhrase>용돈이 필요한 이유를 작성해주세요!</SmallPhrase>
            </div>
            <InputContainer>
              <Img src={MessageImage} alt="메세지" />
              <Message
                placeholder="합리적인 이유를 적어주세요!"
                maxLength="20"
                onChange={handleInputChange}
                value={requestData.content}
              ></Message>
            </InputContainer>
          </S.StepWrapper>
        )}
        {step === 3 && (
          <S.StepWrapper>
            <CompleteContainer>
              <Img src={AllowanceImage} alt="완료" />
              <S.Question>용돈 조르기 완료</S.Question>
              <S.CompleteCard>
                <div>{requestData.parentName}</div>
                <div tw="text-[#154B9B]">
                  {normalizeNumber(requestData.amount)}원
                </div>
              </S.CompleteCard>
              <div tw="text-sm">
                <span tw="text-[#154B9B]">{formattedDate}</span>까지 응답하지
                않으면 취소돼요.
              </div>
            </CompleteContainer>
          </S.StepWrapper>
        )}
        <S.ButtonWrapper>
          {step < 3 ? (
            <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
          ) : (
            <S.BottomBtn onClick={handleAllowanceRedirect}>완료</S.BottomBtn>
          )}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default NewAllowanceRequest;

const SmallPhrase = styled.div`
  ${tw`flex
  text-sm
  font-medium
  justify-center`}
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Img = styled.img`
  width: 80%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-5 items-center`}
  font-size: 18px;
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-20
  gap-2`}
`;
