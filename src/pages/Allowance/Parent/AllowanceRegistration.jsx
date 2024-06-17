import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import { normalizeNumber } from "../../../utils/NormalizeNumber";

import Header from "~/components/common/Header";

const AllowanceRegistration = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/allowance/management");
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      dispatch(setInitialState());
      navigate("/mission");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPeriod(value);
  };

  const handleNext = () => {
    if (step === 0) {
      if (!amount || parseInt(amount) <= 0) {
        setError1("금액을 올바르게 입력해주세요!");
        return;
      }
      if (!period || parseInt(period) <= 0 || parseInt(period) > 12) {
        setError2("기간을 1-12개월 사이로 입력해주세요!");
        return;
      }
      console.log(amount, period);
      setStep(1);
    } else {
      navigate("/allowance/management");
    }
  };

  return (
    <S.Container>
      <Header onLeftClick={handleLeftClick} title={"용돈"} right={"취소"} onRightClick={handleRightClick} />
      {step === 0 && (
        <StepWrapper>
          <div>
            <S.Phrase tw="text-[20px] ml-2">금액</S.Phrase>
            <StyledInputWrapper>
              <StyledInput type="text" placeholder="매달 얼마나 보낼까요?" value={amount} onChange={handleAmountChange} />
              <StyledUnit>원</StyledUnit>
            </StyledInputWrapper>
            {error1 && <Error>{error1}</Error>}
          </div>
          <div>
            <S.Phrase tw="text-[20px] ml-2">기간</S.Phrase>
            <StyledInputWrapper>
              <StyledInput type="text" placeholder="얼마 동안 보낼까요? (1~12)" value={period} onChange={handlePeriodChange} />
              <StyledUnit>개월</StyledUnit>
            </StyledInputWrapper>
            {error2 && <Error>{error2}</Error>}
          </div>
        </StepWrapper>
      )}
      {step === 1 && (
        <CompleteContainer>
          <ResultWrapper>
            <ResultPhrase>양은수 님에게</ResultPhrase>
            <ResultPhrase>{normalizeNumber(amount)}원을</ResultPhrase>
            <ResultPhrase>{period}개월 동안 매달 보낼게요</ResultPhrase>
          </ResultWrapper>
        </CompleteContainer>
      )}
      <S.ButtonWrapper>
        <S.BottomBtn onClick={handleNext}>{step === 0 ? "다음" : "보내기"}</S.BottomBtn>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default AllowanceRegistration;

const StepWrapper = styled.div`
  ${tw`flex flex-col gap-10`}
`;

const StyledInputWrapper = styled.div`
  background-color: #e9f2ff;
  padding: 7px 20px;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: calc(100% - 45px);
  height: 56px;
  font-size: 18px;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c9c9c9;
  }
`;

const StyledUnit = styled.span`
  ${tw`text-lg`}
  margin-left: 10px;
`;

const Error = styled.div`
  ${tw`text-red-500`}
  position: absolute;
  right: 30px;
`;

const ResultWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center gap-1`}
  height: calc(100vh - 200px);
`;

const ResultPhrase = styled.div`
  ${tw`text-3xl font-bold text-center`}
`;

const CompleteContainer = styled.div`
  ${tw`flex flex-col items-center gap-2`}
`;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import tw from "twin.macro";
// import { styled } from "styled-components";
// import * as S from "../../../styles/GlobalStyles";

// import { normalizeNumber } from "../../../utils/NormalizeNumber";

// import Header from "~/components/common/Header";
// import Period from "../../../components/common/Period";
// import KeypadInput from "../../../components/Allowance/KeypadInput";

// import MoneyImage from "~/assets/img/common/money.svg";

// const AllowanceRegistration = () => {
//   const [step, setStep] = useState(0);
//   const [displayedNumber, setDisplayedNumber] = useState("0");
//   const [selectedPeriod, setSelectedPeriod] = useState("0개월");
//   const [allowanceData, setAllowanceData] = useState({
//     childId: "",
//     parentId: "",
//     period: "",
//     amount: "",
//   });

//   const navigate = useNavigate();

//   const handleNext = () => {
//     let error = "";

//     switch (step) {
//       case 0:
//         if (isDisplayedNumberZero()) {
//           error = "금액을 입력해주세요!";
//         } else {
//           setAllowanceData({
//             ...allowanceData,
//             amount: parseInt(displayedNumber),
//           });
//           setStep(step + 1);
//         }
//         break;
//       case 1:
//         if (isZeroMonthSelected()) {
//           error = "기간을 선택해주세요!";
//         } else {
//           setAllowanceData({
//             ...allowanceData,
//             period: parseInt(selectedPeriod.replace("개월", "")),
//           });
//           setStep(step + 1);
//         }
//         break;
//       case 2:
//         setStep(step + 1);
//       default:
//         break;
//     }

//     if (error) {
//       alert(error);
//     }
//   };

//   const isDisplayedNumberZero = () => displayedNumber === "0";
//   const isZeroMonthSelected = () => selectedPeriod === "0개월";

//   const handlePeriodChange = (period) => {
//     setSelectedPeriod(period);
//   };

//   const handleAllowanceRedirect = () => {
//     console.log(allowanceData);
//     navigate("/allowance/management");
//   };

//   return (
//     <S.Container>
//       <Header left={"<"} title={"용돈"} right={"취소"} />
//       <S.FormWrapper>
//         {step === 0 && (
//           <S.StepWrapper>
//             <S.Question>매달 얼마나 보낼까요?</S.Question>
//             <KeypadInput displayedNumber={displayedNumber} setDisplayedNumber={setDisplayedNumber} />
//           </S.StepWrapper>
//         )}
//         {step === 1 && (
//           <S.StepWrapper tw="gap-0">
//             <S.Question>얼마 동안 보낼까요?</S.Question>
//             <Period onPeriodChange={handlePeriodChange} />
//           </S.StepWrapper>
//         )}
//         {step === 2 && (
//           <S.StepWrapper tw="gap-0">
//             <ResultWrapper>
//               <ResultPhrase>
//                 <span tw="text-[#154B9B]">양은수</span> 님에게
//               </ResultPhrase>
//               <ResultPhrase>{normalizeNumber(allowanceData.amount)}원을</ResultPhrase>
//               <ResultPhrase>매달 보낼게요</ResultPhrase>
//             </ResultWrapper>
//           </S.StepWrapper>
//         )}
//         {step === 3 && (
//           <S.StepWrapper>
//             <CompleteContainer>
//               <img src={MoneyImage} alt="완료" />
//               <S.Question>정기 용돈 등록 완료</S.Question>
//               <S.CompleteCard style={{ gap: "2px" }}>
//                 <ResultPhrase>양은수 님에게</ResultPhrase>
//                 <ResultPhrase>6개월 동안</ResultPhrase>
//                 <ResultPhrase tw="text-[#154B9B]">매달 {normalizeNumber(allowanceData.amount)}원</ResultPhrase>
//               </S.CompleteCard>
//             </CompleteContainer>
//           </S.StepWrapper>
//         )}

//         <S.ButtonWrapper>
//           {step < 2 ? (
//             <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
//           ) : step === 2 ? (
//             <S.BottomBtn onClick={handleNext}>보내기</S.BottomBtn>
//           ) : (
//             <S.BottomBtn onClick={handleAllowanceRedirect}>완료</S.BottomBtn>
//           )}
//         </S.ButtonWrapper>
//       </S.FormWrapper>
//     </S.Container>
//   );
// };

// export default AllowanceRegistration;

// const ResultWrapper = styled.div`
//   ${tw`flex flex-col justify-center items-center gap-1`}
//   height: calc(100vh - 200px);
// `;

// const ResultPhrase = styled.div`
//   ${tw`text-3xl
//   font-bold
//   text-center`}
// `;

// const CompleteContainer = styled.div`
//   ${tw`flex
//   flex-col
//   items-center
//   gap-2`}
// `;
