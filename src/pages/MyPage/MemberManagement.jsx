import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, fetchUserInfo } from "../../services/user";
import { setFamilyInfo } from "../../store/reducers/Auth/user";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";

import { addMember } from "../../services/user";

import CompleteImage from "~/assets/img/common/complete.svg";
import NicknameImage from "~/assets/img/MyPage/nickname.svg";
import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import SearchIcon from "~/assets/img/MyPage/search.svg";

import availableProfiles from "../../assets/data/profileImages";

const MemberManagement = () => {
  const [step, setStep] = useState(0);
  const [requestData, setRequestData] = useState({
    phoneNum: "",
    parentsAlias: "",
  });
  const [members, setMembers] = useState([]);
  const [sn, setSn] = useState();
  const [profile, setProfile] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
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
        if (!requestData.parentsAlias) {
          alert("부모님의 닉네임을 입력해주세요! (ex. 엄마)");
        } else if (requestData.parentsAlias.length > 5) {
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
      parentsAlias: value,
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter((member) => member.phoneNum.includes(searchTerm));

  const handleMemberChange = (phoneNum, sn, profileId) => {
    setSn(sn),
      setProfile(profileId),
      setRequestData({
        ...requestData,
        phoneNum: phoneNum,
      });
  };

  const handleSubmit = async () => {
    try {
      await addMember(requestData);

      dispatch(setFamilyInfo({ name: requestData.parentsAlias, sn: sn, profileId: profile }));

      setStep(step + 1);
    } catch (error) {
      alert(error);
    }
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
              <Search placeholder="연락처로 검색해봐요" value={searchTerm} onChange={handleSearchInputChange} />
            </SearchWrapper>
            <MemberContainer>
              {filteredMembers.map((member, index) => {
                const selectedProfile = availableProfiles.find((profile) => profile.id === member.profileId);
                const profileSrc = selectedProfile ? selectedProfile.src : CharacterImage1;

                return <Member key={index} name={member.name} role="부모" profileSrc={profileSrc} onClick={() => handleMemberChange(member.phoneNum, member.sn, member.profileId)} />;
              })}
            </MemberContainer>
          </S.StepWrapper>
        )}
        {step === 1 && (
          <S.StepWrapper>
            <CompleteContainer>
              <Img src={NicknameImage} alt="parentsAlias" />
            </CompleteContainer>
            <StyledInputWrapper>
              <StyledInput placeholder="부모님을 뭐라고 부를까요?" onChange={handleInputChange} value={requestData.parentsAlias} maxLength={5}></StyledInput>
            </StyledInputWrapper>
          </S.StepWrapper>
        )}
        {step === 2 && (
          <S.StepWrapper>
            <CompleteContainer>
              <Img src={CompleteImage} alt="완료" />
              <Complete>
                <S.Question tw="m-0">{requestData.parentsAlias} 님이</S.Question>
                <S.Question tw="m-0">부모에 추가</S.Question>
                <S.Question tw="m-0">되었습니다</S.Question>
              </Complete>
            </CompleteContainer>
          </S.StepWrapper>
        )}

        <S.ButtonWrapper>
          {step < 1 ? (
            <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
          ) : step === 1 ? (
            <S.BottomBtn onClick={handleSubmit}>추가하기</S.BottomBtn>
          ) : (
            <S.BottomBtn onClick={handleHomeRedirect}>완료</S.BottomBtn>
          )}
        </S.ButtonWrapper>
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
