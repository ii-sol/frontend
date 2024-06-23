import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setParentSn, setChildSn } from "../../../store/reducers/Mission/mission";
import { fetchUserInfo } from "../../../services/user";
import { createMissionRequest } from "../../../services/mission";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Member from "~/components/common/Member";

import CharacterImage1 from "~/assets/img/common/character/character_sol.svg";
import availableProfiles from "../../../assets/data/profileImages";

const CreateMissionMember = () => {
  const [memberDetail, setMemberDetail] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestData = useSelector((state) => state.mission);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  const csn = useSelector((state) => state.user.userInfo.sn);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await Promise.all(
        familyInfo.map(async (member) => {
          const userInfo = await fetchUserInfo(member.sn);
          return {
            ...member,
            profileId: userInfo.profileId,
          };
        })
      );
      setMemberDetail(profiles);
    };

    fetchProfiles();
    dispatch(setChildSn(csn));
  }, [familyInfo]);

  const handleLeftClick = () => {
    navigate("/mission/amount");
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      dispatch(setInitialState());
      navigate("/mission");
    }
  };

  const handleNext = async () => {
    if (!requestData.parentSn) {
      alert("부모님을 선택해주세요!");
    } else {
      try {
        await createMissionRequest(requestData);
        navigate("/mission/complete");
      } catch (error) {
        console.error("Error creating mission request:", error);
      }
    }
  };

  const handleMemberChange = (psn) => {
    dispatch(setParentSn(psn));
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} right={"취소"} onRightClick={handleRightClick} />
      <S.FormWrapper>
        <S.StepWrapper>
          <S.Question>누구에게 미션을 요청할까요?</S.Question>
          <MemberContainer>
            {memberDetail.map((member) => {
              const selectedProfile = availableProfiles.find((profile) => profile.id === member.profileId);
              const profileSrc = selectedProfile ? selectedProfile.src : CharacterImage1;

              return <Member key={member.sn} img={profileSrc} name={member.name} role="부모" onClick={() => handleMemberChange(member.sn)} />;
            })}
          </MemberContainer>
        </S.StepWrapper>
        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>요청하기</S.BottomBtn>{" "}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default CreateMissionMember;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;
