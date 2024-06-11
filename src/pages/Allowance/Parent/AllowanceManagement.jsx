import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";

const AllowanceManagement = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈"} right={""} />
      <Menu>
        <Phrase>정기용돈</Phrase>
        <History>지난 용돈 &gt;</History>
      </Menu>
      <CardContainer></CardContainer>
    </Container>
  );
};

export default AllowanceManagement;

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
