import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { FiEdit2 } from "react-icons/fi";
import { getCredibility } from "../../utils/getCredibility";
import { updateUserInfo } from "../../services/user";
import { useSelector } from "react-redux";

import profiles from "../../assets/data/profileImages";

const Profile = ({ userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const initialBirthDate = new Date(userInfo.birthDate);
  const initialBirthDateString = initialBirthDate.toISOString().slice(0, 10);
  const [profileData, setProfileData] = useState({
    name: userInfo.name,
    birthDate: initialBirthDateString,
    phoneNum: userInfo.phoneNum,
    profileId: userInfo.profileId,
    credibility: getCredibility(userInfo.score),
  });

  const accessToken = useSelector((state) => state.user.accessToken);

  const handleEditClick = () => {
    if (isEditing === false) {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const isValidName = /^[\uAC00-\uD7A3]{2,5}$/.test(profileData.name); // 2~5글자의 한글 이름인지 체크하는 정규 표현식
    const isValidPhone = profileData.phoneNum.length === 13;
    const isValidBirth = profileData.birthDate.length === 10;

    const { credibility, ...dataWithoutCredibility } = profileData;

    if (isValidName && isValidPhone && isValidBirth) {
      try {
        const data = await updateUserInfo(accessToken, dataWithoutCredibility);
        alert("정보가 업데이트 되었습니다.");
      } catch (error) {
        console.error(error);
      }
      setIsEditing(false);
    } else {
      alert("잘못된 입력입니다.");
    }
  };

  const selectedProfile = profiles.find((profile) => profile.id === profileData.profileId);
  const profileImageSrc = selectedProfile ? selectedProfile.src : Profile1;

  return (
    <Container>
      <EditButton onClick={handleEditClick}>
        <FiEdit2 tw="w-[23px] h-[23px]" />
      </EditButton>
      <ProfileWrapper>
        <ProfileImage src={profileImageSrc} alt="profile" />
        <InfoWrapper>
          <Info>이름: {isEditing ? <Input type="text" name="name" value={profileData.name} onChange={handleChange} /> : <span>{profileData.name}</span>}</Info>
          <Info>생일: {isEditing ? <Input type="text" name="birthDate" value={profileData.birthDate} onChange={handleChange} /> : <span>{profileData.birthDate}</span>}</Info>
          <Info tw="flex-col gap-0">
            전화번호: {isEditing ? <Input tw="w-[93%]" type="text" name="phoneNum" value={profileData.phoneNum} onChange={handleChange} /> : <span>{profileData.phoneNum}</span>}
          </Info>
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
