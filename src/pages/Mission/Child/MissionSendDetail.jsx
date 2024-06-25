import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import { fetchMissionDetail } from "../../../services/mission";
import { setMissionData } from "../../../store/reducers/Mission/mission";
import { useSelector, useDispatch } from "react-redux";

import { normalizeNumber } from "../../../utils/normalizeNumber";

import MissionImage from "~/assets/img/common/sdamSol.svg";

import Header from "~/components/common/Header";

const padZero = (num) => (num < 10 ? `0${num}` : num);

const MissionSendDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const [cancelDate, setCancelDate] = useState("");

  const mission = useSelector((state) => state.mission.missionData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMissionDetail(id);
        if (data) {
          const dueDate = new Date(data.dueDate);
          const formattedDueDate = `${dueDate.getFullYear()}.${padZero(dueDate.getMonth() + 1)}.${padZero(dueDate.getDate())}`;

          const currentDate = new Date();
          const cancelDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
          const formattedCancelDate = `${cancelDate.getFullYear()}.${padZero(cancelDate.getMonth() + 1)}.${padZero(cancelDate.getDate())}`;

          const finalCancelDate = new Date(Math.min(cancelDate.getTime(), dueDate.getTime()));
          const formattedFinalCancelDate = `${finalCancelDate.getFullYear()}.${padZero(finalCancelDate.getMonth() + 1)}.${padZero(finalCancelDate.getDate())}`;

          dispatch(setMissionData({ ...data, formattedDueDate }));
          setCancelDate(formattedFinalCancelDate);
        }
      } catch (error) {
        console.error("Error fetching mission detail:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleLeftClick = () => {
    navigate("/mission");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} right={""} />
      <S.StepWrapper>
        <CompleteContainer>
          <S.Question>수락을 기다리고 있어요!</S.Question>
          <Img src={MissionImage} alt="mission" />
          <S.Question>{name}</S.Question>
          <S.CompleteCard>
            <div>"{mission.content}"</div>
            <div tw="text-[#154B9B]">{normalizeNumber(mission.price)}원</div>
            <div tw="text-base">미션 완료일 : {mission.formattedDueDate}</div>
          </S.CompleteCard>
          <div tw="text-sm font-bold">
            <span tw="text-[#154B9B]">{cancelDate}</span> 까지 응답하지 않으면 취소돼요
          </div>
        </CompleteContainer>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MissionSendDetail;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  my-12
  gap-2`}
`;

const Img = styled.img`
  width: 40%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;
