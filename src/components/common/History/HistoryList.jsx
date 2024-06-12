import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Filter from "./Filter";
import { useLocation } from "react-router-dom";
import InvestHistory from "../../Investment/HistoryListItem";

const HistoryList = () => {
  const location = useLocation();
  return (
    <Container>
      <Filter></Filter>
      <List>
        {location.pathname === "/invest/history" ? <InvestHistory /> : <></>}
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
