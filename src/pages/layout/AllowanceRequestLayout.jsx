import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import { styled } from "styled-components";

const AllowanceRequestLayout = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈조르기"} right={"취소"} />
      <Outlet />
    </Container>
  );
};

export default AllowanceRequestLayout;

const Container = styled.div`
  height: 100vh;
  padding: 30px;
`;
