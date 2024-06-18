import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/Loan/completeImg.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectLoanDetails } from "../../../store/selectors";
import { store } from "../../../store/stores";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

const Complete = () => {
  const navigate = useNavigate();

  const loanDetails = store.getState().loan;
  console.log(loanDetails);
  console.log(store.getState());

  useEffect(() => {
    if (loanDetails) {
      axios
        .post("http://localhost:8082/child/loan/create", loanDetails)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error creating the loan!", error);
        });
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
      <div tw="flex justify-center mt-32">
        <img src={moneyHand} alt="Money Hand" tw="w-4/12 max-w-xs" />
      </div>
      <div>
        <p tw="text-center text-2xl font-bold mt-4">대출 신청 완료</p>
      </div>

      <div tw="flex flex-col h-28 bg-blue-100 items-center rounded-2xl p-3 mt-12">
        <div tw="text-2xl text-center pt-2 font-bold">엄마</div>
        <p tw="text-xl text-center pt-2">
          {formatAmount(loanDetails.amount)}원
        </p>
      </div>
      <p tw="text-sm text-center mt-1 text-red-500">
        2024.06.01까지 응답하지 않으면 취소돼요.
      </p>

      <button
        tw="fixed bottom-10 left-7 right-7 bg-blue-200 p-3 text-center rounded-2xl hover:bg-blue-300 cursor-pointer"
        onClick={complete}
      >
        완료
      </button>
    </>
  );
};

export default Complete;
