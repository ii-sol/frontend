import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import { fetchUserInfo, deleteParent } from "../../services/user";
import { useSelector } from "react-redux";

import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import Header from "~/components/common/Header";
import Profile from "../../components/MyPage/Profile";

import CustomerServiceImage from "~/assets/img/MyPage/service.svg";
import FAQImage from "~/assets/img/MyPage/faq.svg";

import Profile1 from "~/assets/img/common/character/character_sol.svg";
import Profile2 from "~/assets/img/common/character/character_moli.svg";
import Profile3 from "~/assets/img/common/character/character_rino.svg";
import Profile4 from "~/assets/img/common/character/character_shoo.svg";
import Profile5 from "~/assets/img/common/character/character_doremi.svg";
import Profile6 from "~/assets/img/common/character/character_lulu.svg";
import Profile7 from "~/assets/img/common/character/character_pli.svg";
import Profile8 from "~/assets/img/common/character/character_lay.svg";

const availableProfiles = [
  { id: 1, src: Profile1 },
  { id: 2, src: Profile2 },
  { id: 3, src: Profile3 },
  { id: 4, src: Profile4 },
  { id: 5, src: Profile5 },
  { id: 6, src: Profile6 },
  { id: 7, src: Profile7 },
  { id: 8, src: Profile8 },
];

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState([]);

  const navigate = useNavigate();

  const sn = useSelector((state) => state.user.userInfo.sn);
  const accessToken = useSelector((state) => state.user.accessToken);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUserInfo(sn, accessToken);
        setUserInfo(data);
        if (familyInfo) {
          const familyProfiles = await Promise.all(
            familyInfo.map(async (member, index) => {
              const memberInfo = await fetchUserInfo(member.sn, accessToken);
              const selectedProfile = availableProfiles.find((profile) => profile.id === memberInfo.profileId);
              const profileImageSrc = selectedProfile ? selectedProfile.src : Profile1;
              return {
                id: index,
                sn: member.sn,
                src: profileImageSrc,
                name: member.name,
              };
            })
          );
          setProfiles(familyProfiles);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (sn && accessToken) {
      fetchUserData();
    }
  }, [sn, accessToken, familyInfo]);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
    setSelectedProfileId(null);
  };

  const handleProfileSelect = (id) => {
    if (selectedProfileId === id) {
      setSelectedProfileId(null);
    } else {
      setSelectedProfileId(id);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedProfileId === null && isDeleting) {
      setIsDeleting(false);
      setSelectedProfileId(null);
    } else if (window.confirm("정말 삭제하시겠습니까?")) {
      const profileToDelete = profiles.find((profile) => profile.id === selectedProfileId);
      if (profileToDelete) {
        try {
          await deleteParent(profileToDelete.sn, accessToken);
          setProfiles(profiles.filter((profile) => profile.id !== selectedProfileId));
          setIsDeleting(false);
          setSelectedProfileId(null);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setIsDeleting(false);
      setSelectedProfileId(null);
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
              <ProfileImage src={profile.src} isSelected={selectedProfileId === profile.id} onClick={() => isDeleting && handleProfileSelect(profile.id)} />
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
