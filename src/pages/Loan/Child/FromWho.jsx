import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import momIcon from "~/assets/img/Loan/MomIcon.svg";
import dadIcon from "~/assets/img/Loan/MomIcon.svg"; // 아빠 아이콘 추가
import NextButton from "../../../components/Loan/NextButton";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import * as S from "../../../styles/GlobalStyles";
import Member from "../../../components/common/Member";
import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import { baseInstance } from "../../../services/api";

const FromWho = () => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [loanLimit, setLoanLimit] = useState(0); // 대출 한도 추가
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (who) => {
    setSelected(who);
    setError("");
  };

  const childInfo = useSelector((state) => state.user.userInfo.sn);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);

  useEffect(() => {
    dispatch(setLoanDetails({ childId: childInfo }));

    const fetchLoanLimit = async () => {
      try {
        const response = await baseInstance.get("/users/child-manage");
        const limit = response.data.response.loanLimit || 100; // 기본 한도 설정
        setLoanLimit(limit);
      } catch (error) {
        console.error("Failed to fetch loan limit", error);
      }
    };

    fetchLoanLimit();
  }, [childInfo, dispatch]);

  const handleNext = () => {
    if (selected) {
      const selectedMember = familyInfo.find(
        (member) => member.name === selected
      );
      dispatch(setLoanDetails({ parentId: selectedMember.sn, loanLimit }));
      navigate("/loan/money");
    } else {
      setError("대출을 신청할 사람을 선택해 주세요");
    }
  };

  console.log(familyInfo);

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
          {!familyInfo ? (
            <p>"부모를 연결해주세요!"</p>
          ) : (
            familyInfo.map((member) => (
              <Member
                key={member.sn}
                img={CharacterImage1}
                name={member.name}
                role="부모"
                phoneNum={member.phoneNum}
                onClick={() => handleSelect(member.name)}
              />
            ))
          )}
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
