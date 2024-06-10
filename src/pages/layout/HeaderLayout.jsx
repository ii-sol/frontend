import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import { styled } from "styled-components";

const HeaderLayout = ({ left, title, right }) => {
  return (
    <Container>
      <Header left={left} title={title} right={right} />
      <Outlet />
    </Container>
  );
};

export default HeaderLayout;

const Container = styled.div`
  height: 100vh;
  padding: 30px;
`;
