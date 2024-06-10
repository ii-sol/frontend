import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const DateHeader = ({ leftChild, title, rightChild }) => {
  return (
    <Container>
      <Content>{leftChild}</Content>
      <Content>{title}</Content>
      <Content>{rightChild}</Content>
    </Container>
  );
};

export default DateHeader;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #f4f9ff;
  padding: 10px;
  border-radius: 15px;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
