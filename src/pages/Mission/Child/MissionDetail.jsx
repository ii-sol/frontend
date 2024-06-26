import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import { fetchMissionDetail, acceptMissionRequest } from "../../../services/mission";
import { setMissionData, deleteOngoingData } from "../../../store/reducers/Mission/mission";
import { formatDate } from "../../../utils/formatDate";
import { useSelector, useDispatch } from "react-redux";

import { normalizeNumber } from "../../../utils/normalizeNumber";

import MissionImage from "~/assets/img/common/sdamSol.svg";

import Header from "~/components/common/Header";

const MissionDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const mission = useSelector((state) => state.mission.missionData);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMissionDetail(id);
        if (data) {
          dispatch(setMissionData({ ...data }));
        }
      } catch (error) {
        console.error("Error fetching mission detail:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const csn = useSelector((state) => state.user.userInfo.sn);
  const psn = mission.parentsSn;
  const parentName = familyInfo.find((member) => member.sn === psn)?.name || "미확인";

  const handleLeftClick = () => {
    navigate("/mission");
  };

  const handleRejectClick = async () => {
    const confirmReject = window.confirm("정말 그만할래요?");
    if (confirmReject) {
      try {
        await acceptMissionRequest({ id: id, childSn: csn, parentsSn: psn, answer: false });
        dispatch(deleteOngoingData(id));
        navigate("/mission");
      } catch (error) {
        console.error("Error rejecting the mission:", error);
      }
    }
  };

  const handleAcceptClick = async () => {
    const confirmAccept = window.confirm("미션을 완료했나요?");
    if (confirmAccept) {
      try {
        const result = await acceptMissionRequest({ id: id, childSn: csn, parentsSn: psn, answer: true });
        console.log(result);
        dispatch(deleteOngoingData(id));
        navigate("/mission");
      } catch (error) {
        console.error("Error completing the mission:", error);
      }
    }
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
      <S.StepWrapper>
        <CompleteContainer>
          <StatusTag>진행중</StatusTag>
          <Img src={MissionImage} alt="mission" />
          <S.Question>{parentName} 의 미션</S.Question>
          <S.CompleteCard>
            <div>{mission.content}</div>
            <div tw="text-[#154B9B]">{normalizeNumber(mission.price)}원</div>
          </S.CompleteCard>
          <div tw="text-xs font-bold">
            미션 완료일 :<span tw="text-[#154B9B]">{formatDate(mission.dueDate)}</span>
          </div>
        </CompleteContainer>
        <S.BottomBtnWrapper>
          <S.rejectBtn onClick={handleRejectClick}>그만하기</S.rejectBtn>
          <S.acceptBtn onClick={handleAcceptClick}>완료하기</S.acceptBtn>
        </S.BottomBtnWrapper>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MissionDetail;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-14
  gap-2`}
`;

const StatusTag = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #346bac;
  background-color: #d5e0f1;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 40%;
  height: auto;
  margin-top: 15px;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;
