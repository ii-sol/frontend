import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import { styled } from "styled-components";

const AllowanceHistoryLayout = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={"취소"} />
      <Outlet />
    </Container>
  );
};

export default AllowanceHistoryLayout;

const Container = styled.div`
  height: 100vh;
  padding: 30px;
`;
