import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import CharacterImage from "~/assets/img/common/character/character_pli.svg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "이름",
    birth: "2000.00.00",
    phone: "010-0000-0000",
    credibility: "매우높음",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const isValidName = /^[\uAC00-\uD7A3]{2,5}$/.test(profileData.name); // 2~5글자의 한글 이름인지 체크하는 정규 표현식
    const isValidPhone = profileData.phone.length === 13;
    const isValidBirth = profileData.birth.length === 10;

    if (isValidName && isValidPhone && isValidBirth) {
      setProfileData(profileData);
      console.log(profileData);
      alert("정보가 업데이트 되었습니다.");
      setIsEditing(false);
    } else {
      alert("잘못된 입력입니다.");
    }
  };

  return (
    <Container>
      <EditButton onClick={handleEditClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 8.23992L7.24 20.9999H3V16.7599L15.76 3.99992C16.3225 3.43812 17.085 3.12256 17.88 3.12256C18.675 3.12256 19.4375 3.43812 20 3.99992V3.99992C20.5618 4.56242 20.8774 5.32492 20.8774 6.11992C20.8774 6.91492 20.5618 7.67742 20 8.23992Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </EditButton>
      <ProfileWrapper>
        <ProfileImage src={CharacterImage} alt="프로필 이미지" />
        <InfoWrapper>
          <Info>이름: {isEditing ? <Input type="text" name="name" value={profileData.name} onChange={handleChange} /> : <span>{profileData.name}</span>}</Info>
          <Info>생일: {isEditing ? <Input type="text" name="birth" value={profileData.birth} onChange={handleChange} /> : <span>{profileData.birth}</span>}</Info>
          <Info tw="flex-col gap-0">전화번호: {isEditing ? <Input tw="w-[89%]" type="text" name="phone" value={profileData.phone} onChange={handleChange} /> : <span>{profileData.phone}</span>}</Info>

          <Info>
            신뢰도: <span>{profileData.credibility}</span>
          </Info>
        </InfoWrapper>
        {isEditing && <SaveButton onClick={handleSave}>저장</SaveButton>}
      </ProfileWrapper>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  height: 212px;
  background-color: rgba(112, 195, 255, 0.5);
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15));
  margin: 20px 0;
  border-radius: 15px;
  position: relative;
`;

const ProfileWrapper = styled.div`
  ${tw`
    flex
    items-center
    h-full
  `}
  padding: 20px;
`;

const ProfileImage = styled.img`
  ${tw`
    w-32
    h-32
    rounded-full
    mr-3
  `}
`;

const InfoWrapper = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

const Info = styled.div`
  ${tw`
    flex
    text-base
    font-bold
    mb-1
    gap-1
  `}

  & > span {
    ${tw`
      text-base
      font-medium
    `}
    width: auto;
  }
`;

const Input = styled.input`
  ${tw`
    text-base
    mb-2
  `}
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 4px;
  width: 69%;
`;

const EditButton = styled.button`
  ${tw`
    absolute
    top-3
    right-3
    border-none
    cursor-pointer
  `}
`;

const SaveButton = styled.button`
  ${tw`
    absolute
    bottom-3
    right-3
    px-3
    py-2
    bg-white
    text-blue-600
    rounded-md
    border-none
    cursor-pointer
    hover:bg-blue-600
  `}
`;
