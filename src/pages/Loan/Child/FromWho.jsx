import React, { useState } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import momIcon from "~/assets/img/Loan/MomIcon.svg";
import dadIcon from "~/assets/img/Loan/MomIcon.svg"; // 아빠 아이콘 추가
import NextButton from "../../../components/Loan/NextButton";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

const FromWho = () => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (who) => {
    setSelected(who);
    setError("");
  };

  const handleNext = () => {
    console.log(selected);
    if (selected) {
      dispatch(setLoanDetails({ parentId: selected === "mom" ? 1 : 2 }));
      navigate("/loan/money");
    } else {
      setError("대출을 신청할 사람을 선택해 주세요");
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
      <div tw="flex flex-col items-center h-screen">
        <div tw="p-5">
          <p tw="text-2xl text-center mt-2 mb-3">누구에게 돈을 빌릴까요?</p>
        </div>
        <div
          tw="flex flex-row w-full h-20 m-2 rounded-2xl cursor-pointer shadow-md"
          css={[selected === "mom" ? tw`bg-blue-200` : tw`bg-blue-100`]}
          onClick={() => handleSelect("mom")}
        >
          <img
            src={momIcon}
            alt="Mom Icon"
            tw="h-16 w-16 rounded-l-2xl ml-6 mt-2"
          />
          <p tw="text-xl ml-6 mt-6">엄마</p>
        </div>
        <div
          tw="flex flex-row w-full h-20 m-2 rounded-2xl cursor-pointer shadow-md"
          css={[selected === "dad" ? tw`bg-blue-200` : tw`bg-blue-100`]}
          onClick={() => handleSelect("dad")}
        >
          <img
            src={dadIcon}
            alt="Dad Icon"
            tw="h-16 w-16 rounded-l-2xl ml-6 mt-2"
          />
          <p tw="text-xl ml-6 mt-6">아빠</p>
        </div>
        {error && <div tw="text-red-500 text-sm text-center mt-2">{error}</div>}
        <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
          <NextButton onClick={handleNext} />
        </footer>
      </div>
    </>
  );
};

export default FromWho;
