import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import RequestCardChild from "~/components/Allowance/RequestCardChild";
import AllowanceImage from "~/assets/img/Allowance/allowanceRequest.svg";
import RegularAllowanceCard from "../../../components/Allowance/RegularAllowanceCard";

const AllowanceRequest = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleHistoryClick = () => {
    navigate("/allowance/irregular/history");
  };

  const handleCreateClick = () => {
    navigate("/allowance/irregular/create");
  };

  return (
    <S.Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"용돈 조르기"} />
      <Menu>
        <S.Phrase>정기용돈</S.Phrase>
      </Menu>
      <RegularAllowanceCard period="1개월" allowance="100000" startDate={"2024.05.12"} endDate={"2024.06.12"} />
      <Menu>
        <S.Phrase>기다리는 중</S.Phrase>
        <S.HistoryLink onClick={handleHistoryClick}>조르기 내역 &gt;</S.HistoryLink>
      </Menu>
      <S.CardContainer>
        <RegisterButton onClick={handleCreateClick}>
          <span tw="text-[#346BAC]">용돈</span>조르기
        </RegisterButton>
        <RequestCardChild dday="0" receiver="엄마" allowance="1000" img={AllowanceImage} />
        <RequestCardChild dday="2" receiver="엄마" allowance="1000" img={AllowanceImage} />
        <RequestCardChild dday="3" receiver="아빠" allowance="5000" img={AllowanceImage} />
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
