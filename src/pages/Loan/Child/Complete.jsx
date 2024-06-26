import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import Completes from "~/assets/img/Loan/completeImg.svg";
import { useSelector } from "react-redux";
import { store } from "../../../store/stores";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import { styled } from "styled-components";
import { BottomBtn } from "../../../styles/GlobalStyles";
import { baseInstance } from "../../../services/api";
import { setLoanDetails } from "../../../store/action";

const Complete = () => {
  const navigate = useNavigate();
  const loanDetails = store.getState().loan;

  console.log(loanDetails);
  console.log(store.getState());

  useEffect(() => {
    const baseUrl = "/child/loan/create";
    if (loanDetails) {
      const loanPost = {
        amount: loanDetails.amount,
        childId: loanDetails.childId,
        message: loanDetails.message,
        parentId: loanDetails.parentId,
        period: loanDetails.period,
        title: loanDetails.title,
      };
      const postLoanData = async () => {
        try {
          const res = await baseInstance.post(baseUrl, loanPost);
          console.log(res);
        } catch (error) {
          console.error("Error posting loan details:", error);
        }
      };
      postLoanData();
    }
  }, [loanDetails]);

  const complete = () => {
    navigate("/loan/main");
  };

  if (!loanDetails) {
    return <div>Loading...</div>;
  }

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Header left={<MdArrowBackIos />} title={"대출"} />
      <div tw="flex justify-center">
        <Img src={Completes} alt="Money Hand" />
      </div>
      <div>
        <p tw="text-center text-2xl font-bold">대출 신청 완료</p>
      </div>

      <div tw="flex flex-col h-28 bg-blue-100 items-center rounded-2xl p-3 mt-12">
        <div tw="text-2xl text-center pt-2 font-bold">엄마</div>
        <p tw="text-xl text-center pt-2">
          {formatAmount(loanDetails.amount)}원
        </p>
      </div>
      <div tw="text-sm text-center mt-2">
        <span tw="text-[#154B9B]"> 2024.06.30 금</span>까지 응답하지 않으면
        취소돼요.
      </div>

      <BottomBtn onClick={complete}>완료</BottomBtn>
    </>
  );
};

export default Complete;

const Img = styled.img`
  margin: 60px auto 40px auto;
`;
