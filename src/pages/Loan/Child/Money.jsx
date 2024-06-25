import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import NextButton from "../../../components/Loan/NextButton";
import Keypad from "../../../components/Loan/KeyPad";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../../styles/GlobalStyles";
import SolImage from "~/assets/img/common/curiousSol.svg";
import { baseInstance } from "../../../services/api";
import { store } from "../../../store/stores";

const Money = () => {
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loanLimit = store.getState().loan.loanLimit * 10000;

  useEffect(() => {
    // 만약 loanLimit이 없으면 기본 값을 설정 (예: 500,000원)
    if (!loanLimit) {
      dispatch(setLoanDetails({ loanLimit: 500000 }));
    }
  }, [loanLimit, dispatch]);

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleButtonClick = (value) => {
    if (value === "←") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "00") {
      setAmount((prev) => (prev !== "0" ? prev + "00" : "0"));
    } else {
      setAmount((prev) => (prev === "0" ? value : prev + value));
    }
    setError("");
  };

  const handleNext = () => {
    const amountNumber = parseInt(amount.replace(/,/g, ""), 10);
    if (amountNumber >= 1000 && amountNumber <= loanLimit) {
      dispatch(setLoanDetails({ amount: amountNumber }));
      navigate("/loan/period");
    } else {
      setError(
        `1,000원 ~ ${loanLimit.toLocaleString()}원 사이에서 빌릴 수 있어요.`
      );
    }
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 빌리기"}
        onLeftClick={() => {
          navigate("/loan/main");
        }}
      />
      <div tw="flex flex-col justify-between">
        <S.Question>얼마를 빌릴까요?</S.Question>
        <div tw="flex justify-center">
          <img src={SolImage} alt="sol" tw="w-[143px] h-[135px] my-5" />
        </div>
        <main tw="flex flex-col items-center flex-grow justify-start mt-2">
          <div tw="bg-gray-100 rounded-2xl p-2 pl-3 pr-3 flex items-center justify-center mt-2">
            <p tw="text-xl">{formatAmount(amount)} 원</p>
          </div>
          {error && (
            <div tw="text-red-500 text-sm text-center mt-2">{error}</div>
          )}
          <Keypad onButtonClick={handleButtonClick} />
          <div tw="mt-8">
            <NextButton onClick={handleNext} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Money;
