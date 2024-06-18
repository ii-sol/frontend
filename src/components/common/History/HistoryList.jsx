import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Filter from "./Filter";
import { useLocation } from "react-router-dom";
import InvestHistory from "../../Investment/HistoryListItem";
import ChildAllowanceHistory from "../../Allowance/ChildHistoryListItem";
import ParentAllowanceHistory from "../../Allowance/ParentHistoryListItem";
import IrregularAllowanceHistory from "../../Allowance/IrregularHistoryListItem";
import MissionHistory from "../../Mission/MissionHistoryListItem";
import AccountHistory from "../../Allowance/AccountHistoryListItem";

const HistoryList = () => {
  const location = useLocation();
  return (
    <Container>
      <Filter></Filter>
      <List>
        {location.pathname === "/invest/history" ? (
          <InvestHistory />
        ) : location.pathname === "/allowance/history" ? (
          <ChildAllowanceHistory />
        ) : location.pathname === "/allowance/history-parent" ? (
          <ParentAllowanceHistory />
        ) : location.pathname === "/allowance/irregular/history" ? (
          <IrregularAllowanceHistory />
        ) : ["/mission/history", "/parent/mission/history"].includes(location.pathname) ? (
          <MissionHistory />
        ) : location.pathname === "/parent/account-history" ? (
          <AccountHistory />
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
