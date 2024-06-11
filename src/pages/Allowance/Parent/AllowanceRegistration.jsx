import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import Button from "~/components/common/Button";
import Keypad from "~/components/common/Keypad";

import PigImage from "~/assets/img/common/pig.svg";
import CalendarImage from "~/assets/img/common/calendar.svg";

const AllowanceRegistration = () => {
  const [step, setStep] = useState(0);
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [allowanceData, setAllowanceData] = useState({
    childId: "",
    parentId: "",
    period: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    let error = "";

    switch (step) {
      case 0:
        if (displayedNumber === "0") {
          error = "금액을 입력해주세요!";
        } else {
          setAllowanceData({
            ...allowanceData,
            amount: parseInt(displayedNumber),
          });
          setStep(step + 1);
        }
        break;
      default:
        break;
    }

    if (error) {
      alert(error);
    }
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

  const handleAllowanceRedirect = () => {
    console.log(requestData);
    navigate("/allowance/management");
  };

  return (
    <Container>
      <Header left={"<"} title={"용돈"} right={"취소"} />
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <Phrase>매달 얼마나 보낼까요?</Phrase>
            <InputContainer>
              <Img src={PigImage} alt="돼지저금통" />
              <Amount displayedNumber={displayedNumber}>{normalizeNumber(displayedNumber)} 원</Amount>
              <Keypad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
            </InputContainer>
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper>
            <Phrase>얼마 동안 보낼까요?</Phrase>
            <InputContainer>
              <Img src={CalendarImage} alt="달력" />
            </InputContainer>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 2 ? (
            <Button onClick={handleNext} text="다음">
              다음
            </Button>
          ) : step === 2 ? (
            <Button onClick={handleNext} text="보내기">
              보내기
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

export default AllowanceRegistration;

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

const Summary = tw.div`
  m-5
`;

const Phrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
  m-5
`;

const SmallPhrase = tw.div`
  flex
  text-sm
  font-medium
  justify-center
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
  //   box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
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

const CompleteContainer = tw.div`
  flex
  flex-col
  items-center
  my-20
  gap-2
`;

const CompleteCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: #f4f9ff;
  font-size: 25px;
  font-weight: 500;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;
