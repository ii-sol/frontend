import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Profile from "../../components/MyPage/Profile";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import CharacterImage2 from "~/assets/img/common/character/character_lay.svg";
import CharacterImage3 from "~/assets/img/common/character/character_moli.svg";
import CharacterImage4 from "~/assets/img/common/character/character_lulu.svg";
import CustomerServiceImage from "~/assets/img/MyPage/service.svg";
import FAQImage from "~/assets/img/MyPage/faq.svg";

const profiles = [
  { id: 1, src: CharacterImage1 },
  { id: 2, src: CharacterImage2 },
  // { id: 3, src: CharacterImage3 },
  // { id: 4, src: CharacterImage4 },
];

const MyPage = () => {
  return (
    <S.Container>
      <Header left={"<"} title={"마이페이지"} right={""} />
      <S.StepWrapper>
        <Profile />
        <S.Phrase>연결 관리</S.Phrase>
        <MemberGrid>
          {profiles.map((profile) => (
            <ProfileImage key={profile.id} src={profile.src} />
          ))}
          <AddButton>추가하기</AddButton>
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

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ProfileImage = styled.img`
  ${tw`
    w-24
    h-24
    object-cover
    rounded-full
    cursor-pointer
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
