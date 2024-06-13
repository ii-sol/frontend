import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/child/moneyhand.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectLoanDetails } from "../../../store/selectors";

const Complete = () => {
  const navigate = useNavigate();
  const loanDetails = useSelector(selectLoanDetails);

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

  return (
    <>
      <img src={moneyHand} alt="Money Hand" />
      <div>
        <p tw="text-center text-2xl font-bold">대출 신청 완료</p>
      </div>

      <div tw="flex flex-col w-10/12 h-28 bg-blue-100 mt-7 ml-9 rounded-2xl">
        <p tw="text-xl text-center pt-5">{loanDetails.period}개월</p>
        <p tw="text-xl text-center pt-2 ">{loanDetails.amount}원</p>
      </div>
      <p tw="text-sm text-center mt-1">
        2024.06.01까지 응답하지 않으면 취소돼요.
      </p>
      <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
        <button
          tw="w-full bg-blue-300 p-3 text-white rounded-xl hover:bg-blue-300 font-bold text-xl"
          onClick={complete}
        >
          완료
        </button>
      </footer>
    </>
  );
};

export default Complete;
