import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import {
  fetchRegularAllowance,
  fetchAllowanceRequest,
  deleteAllowanceRequest,
} from "../../../services/allowance";
import { useSelector } from "react-redux";
import { format, differenceInDays } from "date-fns";

import Header from "~/components/common/Header";
import RequestCardChild from "~/components/Allowance/RequestCardChild";
import RegularAllowanceCard from "../../../components/Allowance/RegularAllowanceCard";

const calculateDday = (createDate) => {
  const threeDaysLater = new Date(createDate);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3); // createDate에서 3일 후의 날짜

  const today = new Date();
  const dday = differenceInDays(threeDaysLater, today); // 오늘 날짜와 endDate 사이의 일 수 차이 계산

  return dday;
};

const AllowanceRequest = () => {
  const [regularAllowance, setRegularAllowance] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchRegular = async () => {
      try {
        const regularAllowance = await fetchRegularAllowance();
        setRegularAllowance(regularAllowance);
      } catch (error) {
        console.error("Error fetching regular allowance:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const requests = await fetchAllowanceRequest();
        setRequestList(requests);
      } catch (error) {
        console.error("Error fetching allowance requests:", error);
      }
    };

    fetchRegular();
    fetchRequests();
  }, []);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleHistoryClick = () => {
    navigate("/allowance/irregular/history");
  };

  const handleCreateClick = () => {
    navigate("/allowance/irregular/create");
  };

  const handleDelete = async (id) => {
    try {
      await deleteAllowanceRequest(id);
      setRequestList(requestList.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error deleting allowance request:", error);
    }
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"용돈 조르기"} />
      <Menu>
        <S.Phrase>정기용돈</S.Phrase>
      </Menu>
      <RegularAllowanceCard regularAllowance={regularAllowance} />
      <Menu>
        <S.Phrase>기다리는 중</S.Phrase>
        <S.HistoryLink onClick={handleHistoryClick}>
          조르기 내역 &gt;
        </S.HistoryLink>
      </Menu>
      <S.CardContainer>
        <RegisterButton onClick={handleCreateClick}>
          <span tw="text-[#346BAC]">용돈</span>조르기
        </RegisterButton>
        {requestList.map((request, index) => (
          <RequestCardChild
            key={index}
            id={request.id}
            dday={calculateDday(request.createDate)}
            receiver={request.name}
            allowance={request.amount}
            onDelete={handleDelete}
          />
        ))}
      </S.CardContainer>
    </S.Container>
  );
};

export default AllowanceRequest;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;
