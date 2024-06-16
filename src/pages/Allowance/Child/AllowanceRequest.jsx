import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import RequestCardChild from "~/components/Allowance/RequestCardChild";
import PleaseImg from "~/assets/img/Allowance/please.svg";
import HeartImg from "~/assets/img/Allowance/heart.svg";
import RegularAllowanceCard from "../../../components/Allowance/RegularAllowanceCard";

const AllowanceRequest = () => {
  return (
    <S.Container>
      <Header left={"<"} title={"용돈 조르기"} right={""} />
      <Menu>
        <S.Phrase>정기용돈</S.Phrase>
      </Menu>
      <RegularAllowanceCard period="1개월" allowance="100000" startDate={"2024.05.12"} endDate={"2024.06.12"} />
      <Menu>
        <S.Phrase>기다리는 중</S.Phrase>
        <S.HistoryLink>조르기 내역 &gt;</S.HistoryLink>
      </Menu>
      <S.CardContainer>
        <S.VirticalCreateCard>용돈 조르기</S.VirticalCreateCard>
        <RequestCardChild dday="0" receiver="엄마" allowance="1000" img={PleaseImg} />
        <RequestCardChild dday="2" receiver="엄마" allowance="1000" img={PleaseImg} />
        <RequestCardChild dday="3" receiver="아빠" allowance="5000" img={HeartImg} />
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
