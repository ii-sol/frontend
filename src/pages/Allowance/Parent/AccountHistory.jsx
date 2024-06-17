import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AccountHistory = () => {
  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header onLeftClick={handleLeftClick} title={"계좌 내역"} right={""} />
      <HistoryFilter />
    </Container>
  );
};

export default AccountHistory;

const Container = styled.div``;
