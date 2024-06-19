import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setContent,
  setInitialState,
} from "../../../store/reducers/Mission/mission";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import { BottomSheet } from "react-spring-bottom-sheet";

import MissionMainImg from "~/assets/img/Mission/missionMain.svg";

import Header from "~/components/common/Header";
import Message from "../../../components/common/Message";

import DueDateBottomSheet from "../../../components/Mission/DueDateBottomSheet";

const missionOptions = [
  { label: "집안일 돕기", status: 0 },
  { label: "심부름", status: 1 },
  { label: "공부", status: 2 },
];

const missionList = [
  { id: 1, type: 0, content: "빨래 개기", price: 1000 },
  { id: 2, type: 0, content: "설거지 하기", price: 2000 },
  { id: 3, type: 0, content: "방 청소하기", price: 2000 },
  { id: 4, type: 1, content: "마트 가기", price: 2000 },
  { id: 5, type: 2, content: "수학 문제 풀기", price: 1000 },
  { id: 6, type: 2, content: "책 읽기", price: 2000 },
  // TODO: 더 많은 미션 추가
];

const CreateMission = () => {
  const [openMissionList, setOpenMissionList] = useState(true);
  const [openDueDate, setOpenDueDate] = useState(false);
  const [selectedOption, setSelectedOption] = useState(missionOptions[0]);
  const navigate = useNavigate();

  const requestData = useSelector((state) => state.mission);
  const dispatch = useDispatch();

  const filteredMissions = selectedOption
    ? missionList.filter((mission) => mission.type === selectedOption.status)
    : missionList;

  const handleLeftClick = () => {
    navigate("/mission");
  };

  const handleRightClick = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      dispatch(setInitialState());
      navigate("/mission");
    }
  };

  const handleInputChange = (content) => {
    dispatch(setContent(content));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleMissionCardClick = (content) => {
    dispatch(setContent(content));
    handleDismissMissionList();
  };

  const handleDismissMissionList = () => {
    setOpenMissionList(false);
  };

  const handleDismissDueDate = () => {
    setOpenDueDate(false);
  };

  const handleNext = () => {
    if (requestData.dueDate && requestData.content) {
      navigate("/mission/amount");
    } else {
      alert("미션과 완료일을 모두 입력해주세요!");
    }
  };

  return (
    <S.Container>
      <Header
        left={"<"}
        onLeftClick={handleLeftClick}
        title={"미션"}
        right={"취소"}
        onRightClick={handleRightClick}
      />
      <S.StepWrapper>
        <S.Question>어떤 미션을 요청할까요?</S.Question>
        <InputContainer>
          <Img src={MissionMainImg} alt="mission" />
          <DueDate onClick={() => setOpenDueDate(true)}>
            {requestData.dueDate ? requestData.dueDate : "미션 완료일 📆"}
          </DueDate>
          <Message
            placeholder="미션을 입력해주세요"
            maxLength="20"
            onChange={handleInputChange}
            value={requestData.content}
          ></Message>
        </InputContainer>
        <S.BottomBtn onClick={handleNext}>다음</S.BottomBtn>
      </S.StepWrapper>

      <StyledBottomSheet
        open={openMissionList}
        onDismiss={handleDismissMissionList}
      >
        <S.Question>미션함</S.Question>
        <MissionOptionWrapper>
          {missionOptions.map((option) => (
            <MissionOption
              key={option.status}
              selected={selectedOption?.status === option.status}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </MissionOption>
          ))}
        </MissionOptionWrapper>
        <S.CardContainer tw="m-1">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              onClick={() => handleMissionCardClick(mission.content)}
            >
              <MissionContent>{mission.content}</MissionContent>
            </MissionCard>
          ))}
        </S.CardContainer>
        <Create onClick={handleDismissMissionList}>직접 만들기</Create>
      </StyledBottomSheet>

      {openDueDate && (
        <DueDateBottomSheet
          requestData={requestData}
          dispatch={dispatch}
          open={openDueDate}
          onDismiss={handleDismissDueDate}
        />
      )}
    </S.Container>
  );
};

export default CreateMission;

const StyledBottomSheet = styled(BottomSheet)`
  font-family: "Pretendard Variable";
  & > div {
    height: calc(100% - 100px);
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
  }
`;

const Img = styled.img`
  width: 50%;
  height: auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const DueDate = styled.div`
  color: #6a6a6a;
`;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-12 items-center my-5`}
  font-size: 18px;
`;

const MissionOptionWrapper = styled.div`
  ${tw`flex gap-3 my-7`}
`;

const MissionOption = styled.button`
  ${tw`px-4 py-2 rounded-[15px] font-bold border-none`}
  filter: drop-shadow(0px 0px 2px rgba(151, 178, 221, 0.40));

  ${({ selected }) => selected && tw`bg-[#CDE1FF] text-[#154B9B]`}
  ${({ selected }) => !selected && tw`bg-[#F5F5F5] text-[#000]`}
`;

const MissionCard = styled.button`
  ${tw`
    flex
    flex-col
    p-5
    gap-1
    relative
  `}
  font-size: 18px;
  width: 143px;
  height: 100px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  cursor: pointer;
`;

const MissionContent = styled.div`
  ${tw`text-lg font-bold`}
`;

const Create = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 15px;
  color: #6a6a6a;
  font-size: 18px;
  font-weight: 700;
`;
