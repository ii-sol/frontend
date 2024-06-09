import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Button from "~/components/common/Button";
import Keypad from "~/components/common/Keypad";
import Member from "~/components/common/Member";

import ChildImage from "~/assets/img/Auth/child.png";
import CoinImage from "~/assets/img/Allowance/coin.png";

const NewAllowanceRequest = () => {
  const [step, setStep] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [requestData, setRequestData] = useState({
    childPhone: "",
    parentPhone: "",
    amount: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    let error = "";
    if (step === 0 && !requestData.parentPhone) {
      error = "부모님을 선택해주세요!";
    } else if (step === 1) {
      if (displayedNumber === "0") {
        error = "금액을 선택해주세요!";
      } else {
        setRequestData({
          ...requestData,
          amount: parseInt(displayedNumber),
        });
        setStep(step + 1);
      }
    }

    if (error) {
      alert(error);
    } else {
      setStep(step + 1);
    }
  };

  const handleMemberChange = (phoneNum) => {
    setRequestData({
      ...requestData,
      parentPhone: phoneNum,
    });
  };

  const handleAllowanceRedirect = () => {
    navigate("/allowance-request");
  };

  const handleNumberClick = (number) => {
    if (displayedNumber.length < 7) {
      setDisplayedNumber((prevNumber) => prevNumber + number);
    }
  };

  const handleBackspace = () => {
    if (displayedNumber.length > 1) {
      setDisplayedNumber((prevNumber) => prevNumber.slice(0, -1));
    }
  };

  const normalizeNumber = (number) => {
    return parseFloat(number).toLocaleString("en-US");
  };

  return (
    <Container>
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <Phrase>누구에게 용돈을 부탁드릴까요?</Phrase>
            <MemberContainer>
              <Member img={ChildImage} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("010-0000-0000")}></Member>
              <Member img={ChildImage} name="엄마"></Member>
              <Member img={ChildImage} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("010-4321-4321")}></Member>
            </MemberContainer>
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper>
            <Phrase>얼마를 달라고 부탁드릴까요?</Phrase>
            <InputContainer>
              <Img src={CoinImage} alt="코인" />
              <Amount displayedNumber={displayedNumber}>{normalizeNumber(displayedNumber)} 원</Amount>
              <Keypad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
            </InputContainer>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 3 ? (
            <Button onClick={handleNext} text="다음">
              다음
            </Button>
          ) : (
            <Button onClick={handleAllowanceRedirect} text="완료">
              완료
            </Button>
          )}
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default NewAllowanceRequest;

const Container = tw.div`
  flex
  flex-col
  gap-3
  justify-center
`;

const FormWrapper = styled.div`
  ${tw`flex
  flex-col
  w-80
  gap-5
  rounded-[15px]
  h-full
  relative`}
  height: calc(100% - 60px);
`;

const StepWrapper = styled.div`
  ${tw`flex flex-col gap-4 flex-grow`}
`;

const ButtonWrapper = styled.div`
  ${`flex
  justify-between
  mt-4`}
`;

const Phrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
  m-5
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Img = styled.img`
  width: 143px;
  height: auto;
  margin-bottom: 16px;
  box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-5 items-center`}
  font-size: 18px;
`;

const Amount = styled.div`
  width: ${(props) => (props.displayedNumber && props.displayedNumber.length > 0 ? "auto" : "123px")}
  height: 49px;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
