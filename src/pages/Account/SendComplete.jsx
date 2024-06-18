import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/Account/billmoney.svg";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

const SendMoneyComplete = () => {
  const navigate = useNavigate();

  const complete = () => {
    navigate("/");
  };

  return (
    <>
      <Header left={<MdArrowBackIos />} title={"돈 보내기"} />
      <div tw="flex flex-col items-center h-screen p-4">
        <div tw="flex flex-col items-center mt-4">
          <img src={moneyHand} alt="Money Hand" tw="w-52 h-52 mt-4" />
          <h2 tw="text-2xl font-semibold mt-4">돈 보내기 완료</h2>
        </div>

        <div tw="flex flex-col items-center w-full mt-12 bg-blue-100 rounded-2xl p-4">
          <h3 tw="text-2xl font-bold">양은수 님</h3>
          <p tw="text-3xl font-bold text-blue-500 mt-2">5,000원</p>
          <p tw="text-xl mt-2 text-gray-600">잔액: 150,000원</p>
        </div>

        <button
          tw="fixed bottom-10 left-8 right-0 mt-10 w-10/12 bg-blue-200 p-3 text-center rounded-2xl hover:bg-blue-300 cursor-pointer"
          onClick={complete}
        >
          완료
        </button>
      </div>
    </>
  );
};

export default SendMoneyComplete;
