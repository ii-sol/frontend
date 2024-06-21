import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { fetchUserInfo } from "../../services/user";
import { useSelector } from "react-redux";

import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import Header from "~/components/common/Header";
import Profile from "../../components/MyPage/Profile";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";
import CharacterImage3 from "~/assets/img/common/character/character_moli.svg";
import CharacterImage4 from "~/assets/img/common/character/character_lulu.svg";
import CustomerServiceImage from "~/assets/img/MyPage/service.svg";
import FAQImage from "~/assets/img/MyPage/faq.svg";

const initialProfiles = [
  { id: 1, src: CharacterImage1, name: "엄마" },
  { id: 2, src: CharacterImage2, name: "아빠" },
  // { id: 3, src: CharacterImage3 },
  // { id: 4, src: CharacterImage4 },
];

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const navigate = useNavigate();

  const sn = useSelector((state) => state.user.userInfo.sn);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUserInfo(sn, accessToken);
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (sn && accessToken) {
      fetchUserData();
    }
  }, [sn, accessToken]);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
    setSelectedProfiles([]);
  };

  const handleProfileSelect = (id) => {
    if (selectedProfiles.includes(id)) {
      setSelectedProfiles(selectedProfiles.filter((profileId) => profileId !== id));
    } else {
      setSelectedProfiles([...selectedProfiles, id]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedProfiles.length === 0 && isDeleting) {
      setIsDeleting(false);
      setSelectedProfiles([]);
    } else if (window.confirm("정말 삭제하시겠습니까?")) {
      setProfiles(profiles.filter((profile) => !selectedProfiles.includes(profile.id)));
      setIsDeleting(false);
      setSelectedProfiles([]);
    } else {
      setIsDeleting(false);
      setSelectedProfiles([]);
    }
  };

  const handleAddButtonClick = () => {
    navigate("/mypage/member");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"마이페이지"} right={""} />
      <S.StepWrapper>
        {userInfo ? <Profile userInfo={userInfo} /> : <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
        <Management>
          <S.Phrase>연결 관리</S.Phrase>
          <EditButton onClick={isDeleting ? handleDeleteConfirm : handleDeleteClick}>{isDeleting ? <RiDeleteBinLine tw="w-[18px] h-[18px]" /> : <FiEdit2 tw="w-[18px] h-[18px]" />}</EditButton>
        </Management>
        <MemberGrid>
          {profiles.map((profile) => (
            <ProfileWrapper key={profile.id}>
              <ProfileImage src={profile.src} isSelected={selectedProfiles.includes(profile.id)} onClick={() => isDeleting && handleProfileSelect(profile.id)} />
              <ProfileName>{profile.name}</ProfileName>
            </ProfileWrapper>
          ))}
          <AddButton onClick={handleAddButtonClick}>추가</AddButton>
        </MemberGrid>
        <MenuWrapper>
          <Menu>
            <img src={CustomerServiceImage} />
            <div>고객 센터 문의하기</div>
          </Menu>
          <Menu>
            <img src={FAQImage} />
            <div>Q&A</div>
          </Menu>
        </MenuWrapper>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MyPage;

const Management = styled.div`
  ${tw`
  flex
  mb-2
  items-center
  justify-between
  `}
`;

const EditButton = styled.button`
  ${tw`
    border-none
    cursor-pointer
  `}
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ProfileWrapper = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const ProfileImage = styled.img`
  ${tw`
    w-24
    h-24
    object-cover
    rounded-full
    cursor-pointer
  `}
  border: ${(props) => (props.isSelected ? "2px solid red" : "none")};
`;

const ProfileName = styled.div`
  ${tw`
    mt-2
    text-center
    text-lg
  `}
`;

const AddButton = styled.button`
  ${tw`
    w-24
    h-24
    text-lg
    flex
    items-center
    justify-center
    rounded-full
    cursor-pointer
  `}
  background-color: rgba(255, 146, 205, 0.40);
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15));
`;

const MenuWrapper = styled.div`
  ${tw`flex flex-col my-4 gap-4`}
`;

const Menu = styled.div`
  ${tw`flex gap-4 text-2xl items-center`}

  & > img {
    ${tw`
    w-14
    `}
  }
`;

const LoadingPlaceholder = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    h-full
  `}
`;
