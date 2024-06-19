import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import momIcon from "~/assets/img/Loan/MomIcon.svg";
import dadIcon from "~/assets/img/Loan/MomIcon.svg"; // 아빠 아이콘 추가
import NextButton from "../../../components/Loan/NextButton";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../../styles/GlobalStyles";
import Member from "../../../components/common/Member";
import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";

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
      <S.StepWrapper>
        <S.Question>누구에게 돈을 빌릴까요?</S.Question>
        <MemberContainer>
          <Member
            img={CharacterImage1}
            name="엄마"
            role="부모"
            phoneNum="010-0000-0000"
            onClick={() => handleSelect("mom")}
          />
          <Member
            img={CharacterImage1}
            name="아빠"
            role="부모"
            phoneNum="010-4321-4321"
            onClick={() => handleSelect("dad")}
          />
        </MemberContainer>
        {error && <div tw="text-red-500 text-sm text-center mt-2">{error}</div>}
        <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
          <NextButton onClick={handleNext} />
        </footer>
      </S.StepWrapper>
    </>
  );
};

export default FromWho;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;
