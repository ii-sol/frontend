import React from "react";
import styled from "styled-components";

const Filter = () => {
  return (
    <Container>
      <Tag $back="#E5EFFF">전체</Tag>
      <Tag $back="#D8FFC5">용돈</Tag>
      <Tag $back="#FFFCA9">미션</Tag>
      <Tag $back="#FFC6DF">대출</Tag>
      <Tag $back="#FFA8A8">투자</Tag>
      <Tag $back="#d1d1d1">기타</Tag>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  padding: 10px 3px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  scroll-behavior: smooth;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 70px;
  height: 35px;
  background-color: ${(props) => props.$back};
  font-weight: 600;
  font-size: 18px;

  &:hover {
    box-shadow: 0px 0px 5px 0px #d3d3d3;
  }
`;
