import React, { useState } from "react";
import Member from "../../components/common/Member";
import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import { styled } from "styled-components";
import tw from "twin.macro";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setParent, setParentName } from "../../store/reducers/Invest/invest";

import Profile1 from "~/assets/img/common/character/character_sol.svg";
import Profile2 from "~/assets/img/common/character/character_moli.svg";
import Profile3 from "~/assets/img/common/character/character_rino.svg";
import Profile4 from "~/assets/img/common/character/character_shoo.svg";
import Profile5 from "~/assets/img/common/character/character_doremi.svg";
import Profile6 from "~/assets/img/common/character/character_lulu.svg";
import Profile7 from "~/assets/img/common/character/character_pli.svg";
import Profile8 from "~/assets/img/common/character/character_lay.svg";

//TODO: familyInfo -> 부모님이 없을 때!!!
const ParentSelection = () => {
  const profiles = [
    { id: 1, src: Profile1 },
    { id: 2, src: Profile2 },
    { id: 3, src: Profile3 },
    { id: 4, src: Profile4 },
    { id: 5, src: Profile5 },
    { id: 6, src: Profile6 },
    { id: 7, src: Profile7 },
    { id: 8, src: Profile8 },
  ];

  const getProfileSrc = (profileId) => {
    const profile = profiles.find((p) => p.id === profileId);
    return profile ? profile.src : null;
  };
  const dispatch = useDispatch();
  const [parents, setParents] = useState(null);
  const [parentsName, setParentsName] = useState(null);
  const navigate = useNavigate();
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  console.log(familyInfo);
  return (
    <S.Container>
      <Header type="none" />
      <S.StepWrapper>
        <Div>누구에게 투자 제안을 할까요?</Div>
        <MemberContainer>
          {familyInfo.map((family) => (
            <Member
              img={getProfileSrc(family.profileId)}
              name={family.name}
              role="부모"
              phoneNum="010-0000-0000"
              onClick={() => {
                setParents(family.sn);
                setParentsName(family.name);
              }}
              key={family.sn}
            />
          ))}
        </MemberContainer>
      </S.StepWrapper>
      <S.BottomBtn
        onClick={() => {
          dispatch(setParent(parents));
          dispatch(setParentName(parentsName));
          navigate("/invest/suggest");
        }}
      >
        다음
      </S.BottomBtn>
    </S.Container>
  );
};

export default ParentSelection;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Div = styled.div`
  font-size: 23px;
  text-align: center;
  margin: 30px auto;
  font-weight: 600;
`;
