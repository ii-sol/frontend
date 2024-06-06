import React from "react";
import { styled } from "styled-components";
import tw from "twin.macro";

const Home = () => {
  return (
    <div tw="flex flex-col gap-4 bg-gray-100">
      <p tw="text-gray-400">Test</p>
      <HomeWrapper>
        <div>gg</div>
        <div>gg</div>
      </HomeWrapper>
      <Wrapper>
        <div>gg</div>
        <div>gg</div>
      </Wrapper>
    </div>
  );
};

export default Home;

const HomeWrapper = tw.div`
    flex
    flex-row
    gap-3
`;

const Wrapper = styled.div`
  font-size: 30px;
`;
