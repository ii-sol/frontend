import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";
import CompleteImage from "~/assets/img/common/complete.svg";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";
import SearchIcon from "~/assets/img/MyPage/search.svg";

const MemberManagement = () => {
  const [step, setStep] = useState(0);
  const [requestData, setRequestData] = useState({
    phoneNum: "",
  });

  const navigate = useNavigate();

  const handleNext = () => {
    switch (step) {
      case 0:
        if (!requestData.phoneNum) {
          alert("사용자를 선택해주세요!");
        }
        break;
      case 1:
        setStep(step + 1);
        break;
      default:
        break;
    }
  };

  const handleMemberChange = (phoneNum) => {
    setRequestData({
      ...requestData,
      phoneNum: phoneNum,
    });
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <S.Container>
      <Header left={"<"} title={"연결 관리"} right={""} />
      <S.FormWrapper>
        {step === 0 && (
          <S.StepWrapper>
            <SearchWrapper>
              <Icon src={SearchIcon} />
              <Search placeholder="연락처로 검색해봐요" />
            </SearchWrapper>
            <MemberContainer>
              <Member img={CharacterImage1} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
              <Member img={CharacterImage2} name="엄마" role="부모" phoneNum="010-1234-1234" onClick={() => handleMemberChange("엄마", "010-1234-1234")}></Member>
              <Member img={CharacterImage1} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("아빠", "010-4321-4321")}></Member>
              <Member img={CharacterImage1} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
              <Member img={CharacterImage1} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
              <Member img={CharacterImage2} name="엄마" role="부모" phoneNum="010-1234-1234" onClick={() => handleMemberChange("엄마", "010-1234-1234")}></Member>
              <Member img={CharacterImage1} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("아빠", "010-4321-4321")}></Member>
              <Member img={CharacterImage1} name="박지민" role="부모" phoneNum="010-0000-0000" onClick={() => handleMemberChange("박지민", "010-0000-0000")}></Member>
              <Member img={CharacterImage2} name="엄마" role="부모" phoneNum="010-1234-1234" onClick={() => handleMemberChange("엄마", "010-1234-1234")}></Member>
              <Member img={CharacterImage1} name="아빠" role="부모" phoneNum="010-4321-4321" onClick={() => handleMemberChange("아빠", "010-4321-4321")}></Member>
            </MemberContainer>
          </S.StepWrapper>
        )}
        {step === 1 && (
          <S.StepWrapper>
            <CompleteContainer>
              <Img src={CompleteImage} alt="완료" />
              <S.Question>
                <div>박지민 님이</div>
                <div>부모에 추가</div>
                <div>되었습니다</div>
              </S.Question>
            </CompleteContainer>
          </S.StepWrapper>
        )}

        <S.ButtonWrapper>{step === 0 ? <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn> : <S.BottomBtn onClick={handleHomeRedirect}>완료</S.BottomBtn>}</S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default MemberManagement;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
  background-color: #f2f2f2;
  border-radius: 15px;
  gap: 10px;
  padding: 15px;
  margin: 10px 0;
`;

const Icon = styled.img`
  width: 24px;
  height: auto;
`;

const Search = styled.input`
  background-color: #f2f2f2;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #b2b2b2;

  &::placeholder {
    color: #b2b2b2;
  }
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
  height: 525px;
  overflow-y: scroll;
`;

const Img = styled.img`
  width: 80%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-20
  gap-2`}
`;
