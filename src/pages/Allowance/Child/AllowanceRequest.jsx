import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import VirticalCreateCard from "~/components/common/VerticalCreateCard";
import RequestCard from "~/components/Allowance/RequestCard";
import PleaseImg from "~/assets/img/Allowance/please.png";
import HeartImg from "~/assets/img/Allowance/heart.png";

const AllowanceRequest = () => {
  return (
    <Container>
      <Menu>
        <Phrase>기다리는 중</Phrase>
        <History>조르기 내역 &gt;</History>
      </Menu>
      <CardContainer>
        <VirticalCreateCard text="용돈 조르기" />
        <RequestCard receiver="엄마" allowance="1000" img={PleaseImg} />
        <RequestCard receiver="아빠" allowance="5000" img={HeartImg} />
      </CardContainer>
    </Container>
  );
};

export default AllowanceRequest;

const Container = styled.div``;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;

const Phrase = tw.div`
  text-lg
  font-bold
  justify-center
  my-2
  justify-self-start
`;

const History = tw.div`
  text-sm
  justify-self-end
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
