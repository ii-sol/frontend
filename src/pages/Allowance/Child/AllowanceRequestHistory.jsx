import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/HistoryFilter";
import RequestCard from "~/components/Allowance/RequestCard";

import PleaseImg from "~/assets/img/Allowance/please.svg";
import HeartImg from "~/assets/img/Allowance/heart.svg";

const AllowanceRequestHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 조르기"} right={""} />
      <HistoryFilter></HistoryFilter>
      <CardContainer>
        <RequestCard status="완료" receiver="엄마" allowance="1000" img={PleaseImg} />
        <RequestCard status="취소" receiver="엄마" allowance="1000" img={PleaseImg} />
        <RequestCard status="취소" receiver="아빠" allowance="5000" img={HeartImg} />
      </CardContainer>
    </Container>
  );
};

export default AllowanceRequestHistory;

const Container = styled.div``;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
