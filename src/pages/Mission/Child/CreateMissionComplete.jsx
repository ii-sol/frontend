import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialState } from "../../../store/reducers/Mission/mission";
import { fetchUserInfo } from "../../../services/user";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import { normalizeNumber } from "../../../utils/normalizeNumber";

import CompleteImage from "~/assets/img/common/complete.svg";

const CreateMissionComplete = () => {
  const requestData = useSelector((state) => state.mission);
  const [parentName, setParentName] = useState("");
  const dispatch = useDispatch();

  const today = new Date();
  const dueDate = new Date(requestData.dueDate);
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  let formattedDate;
  if (dueDate - today <= 2 * 24 * 60 * 60 * 1000) {
    formattedDate = formatDate(dueDate);
  } else {
    formattedDate = formatDate(threeDaysFromNow);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const userInfo = await fetchUserInfo(requestData.parentSn);
        setParentName(userInfo.name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchInfo();
  }, [requestData.parentSn]);

  const handleLeftClick = () => {
    navigate("/mission");
  };

  const handleNext = () => {
    dispatch(setInitialState());
    navigate("/mission");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
      <S.FormWrapper>
        <S.StepWrapper>
          <CompleteContainer>
            <Img src={CompleteImage} alt="complete" />
            <S.Question style={{ marginTop: "0px" }}>미션 요청 완료</S.Question>
            <S.CompleteCard tw="text-[20px]">
              <div>{parentName} 님에게</div>
              <div>"{requestData.content}"를 요청했습니다.</div>
              <div tw="text-[#154B9B]">{normalizeNumber(requestData.price)}원</div>
              <div>미션 완료일 : {formatDate(new Date(requestData.dueDate))}</div>
            </S.CompleteCard>
            <div tw="text-sm">
              <span tw="text-[#154B9B]">{formattedDate}</span>까지 응답하지 않으면 취소돼요.
            </div>
          </CompleteContainer>
        </S.StepWrapper>
        <S.ButtonWrapper>
          <S.BottomBtn onClick={handleNext}>완료</S.BottomBtn>{" "}
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.Container>
  );
};

export default CreateMissionComplete;

const Img = styled.img`
  margin: 60px auto 40px auto;
  // box-shadow: 0px 0px 80px 0px rgba(151, 178, 221, 0.4);
`;

const CompleteContainer = styled.div`
  ${tw`flex
  flex-col
  items-center
  gap-2`}
`;
