import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Filter from "./Filter";
import { useLocation } from "react-router-dom";
import SuggestHistory from "../../Investment/SuggestHistoryList";
import TradeHistory from "../../Investment/TradeHistoryList";
import ChildAllowanceHistory from "../../Allowance/ChildHistoryListItem";
import IrregularAllowanceHistory from "../../Allowance/IrregularHistoryListItem";
import MissionHistory from "../../Mission/MissionHistoryListItem";
import LoanHistoryListItem from "../../../pages/Loan/Child/LoanHistoryListItem";

const HistoryList = () => {
  const location = useLocation();
  return (
    <Container>
      <Filter></Filter>
      <List>
        {location.pathname === "/invest/history" ? (
          <SuggestHistory />
        ) : location.pathname === "/invest/tradehistory" ? (
          <TradeHistory />
        ) : location.pathname === "/allowance/history" ? (
          <ChildAllowanceHistory />
        ) : location.pathname === "/allowance/irregular/history" ? (
          <IrregularAllowanceHistory />
        ) : location.pathname === "/mission/history" ? (
          <MissionHistory />
        ) : location.pathname === "/loan/history" ? (
          <LoanHistoryListItem />
        ) : (
          <></>
        )}
      </List>
    </Container>
  );
};

export default HistoryList;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-4`}
`;

const List = styled.ul`
  ${tw`list-none p-0`}
`;
