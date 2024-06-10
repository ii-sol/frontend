import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import { styled } from "styled-components";

const AllowanceLayout = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈"} right={""} />
      <Outlet />
    </Container>
  );
};

export default AllowanceLayout;

const Container = styled.div`
  height: 100vh;
  padding: 30px;
`;
