import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Member from "~/components/common/Member";
import ChildImage from "~/assets/img/Auth/child.png";

const NewAllowanceRequest = () => {
  return (
    <Container>
      <Phrase>누구에게 용돈을 부탁할까요?</Phrase>
      <MemberContainer>
        <Member img={ChildImage} name="박지민" role="부모" phoneNum="010-0000-0000"></Member>
        <Member img={ChildImage} name="엄마"></Member>
        <Member img={ChildImage} name="딸" role="아이" phoneNum="010-4321-4321"></Member>
      </MemberContainer>
    </Container>
  );
};

export default NewAllowanceRequest;

const Container = tw.div`
  flex
  flex-col
  gap-3
  justify-center
`;

const Phrase = tw.div`
  flex
  text-xl
  font-bold
  justify-center
  m-5
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;
