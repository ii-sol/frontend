import React from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const LoanHistory = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header left={"<"} title={"빌린 기록"} />
      <HistoryFilter />
    </Container>
  );
};

export default LoanHistory;

const Container = styled.div``;
