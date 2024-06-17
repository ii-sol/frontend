import React from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const LoanHistory = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header left={"<"} title={"대출 내역"} />
      <HistoryFilter />
    </Container>
  );
};

export default LoanHistory;

const Container = styled.div``;
