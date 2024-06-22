import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { useSelector } from "react-redux";
import { fetchPhoneNum } from "../../services/user";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";

import CompleteImage from "~/assets/img/common/complete.svg";
import NicknameImage from "~/assets/img/MyPage/nickname.svg";
import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";
import SearchIcon from "~/assets/img/MyPage/search.svg";

const MemberManagement = () => {
  const [step, setStep] = useState(0);
  const [requestData, setRequestData] = useState({
    phoneNum: "",
    nickname: "",
  });
  const [members, setMembers] = useState([]);

  const accessToken = useSelector((state) => state.user.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    const getPhoneNumbers = async () => {
      try {
        const data = await fetchPhoneNum(accessToken);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching phone numbers:", error);
      }
    };

    getPhoneNumbers();
  }, []);

  const handleLeftClick = () => {
    navigate("/mypage");
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        if (!requestData.phoneNum) {
          alert("사용자를 선택해주세요!");
        } else {
          setStep(step + 1);
        }
        break;
      case 1:
        if (!requestData.nickname) {
          alert("부모님의 닉네임을 입력해주세요! (ex. 엄마)");
        } else if (requestData.nickname.length > 5) {
          alert("닉네임은 5글자 이내로 입력해주세요!");
        } else {
          setStep(step + 1);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRequestData({
      ...requestData,
      nickname: value,
    });
  };

  const handleMemberChange = (phoneNum) => {
    setRequestData({
      ...requestData,
      phoneNum: phoneNum,
    });
  };

  const handleHomeRedirect = () => {
    navigate("/mypage");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"연결 관리"} right={""} />
      <S.FormWrapper>
        {step === 0 && (
          <S.StepWrapper>
            <SearchWrapper>
              <Icon src={SearchIcon} />
              <Search placeholder="연락처로 검색해봐요" />
            </SearchWrapper>
            <MemberContainer>
              {members.map((member, index) => (
                <Member
                  key={index}
                  img={member.img || CharacterImage1} // Assuming member object contains an img property
                  name={member.name}
                  role={member.role}
                  phoneNum={member.phoneNum}
                  onClick={() => handleMemberChange(member.phoneNum)}
                />
              ))}
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
              <Img src={NicknameImage} alt="nickname" />
            </CompleteContainer>
            <StyledInputWrapper>
              <StyledInput placeholder="부모님을 뭐라고 부를까요?" onChange={handleInputChange} value={requestData.nickname} maxLength={5}></StyledInput>
            </StyledInputWrapper>
          </S.StepWrapper>
        )}
        {step === 2 && (
          <S.StepWrapper>
            <CompleteContainer>
              <Img src={CompleteImage} alt="완료" />
              <Complete>
                <S.Question tw="m-0">박지민 님이</S.Question>
                <S.Question tw="m-0">부모에 추가</S.Question>
                <S.Question tw="m-0">되었습니다</S.Question>
              </Complete>
            </CompleteContainer>
          </S.StepWrapper>
        )}

        <S.ButtonWrapper>{step < 2 ? <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn> : <S.BottomBtn onClick={handleHomeRedirect}>완료</S.BottomBtn>}</S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default MemberManagement;

const Icon = styled.img`
  width: 24px;
  height: auto;
`;

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
  width: 40%;
  height: auto;
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-20
  gap-2`}
`;

const Complete = styled.div`
  ${tw`flex flex-col gap-2 m-5`}
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
