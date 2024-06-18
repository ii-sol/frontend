import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AllowanceRequestHistory = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/allowance/irregular");
  };

  return (
    <Container>
      <Header left={"<"} onLeftClick={handleLeftClick} title={"용돈 조르기"} />
      <HistoryFilter />
    </Container>
  );
};

export default AllowanceRequestHistory;

const Container = styled.div``;
