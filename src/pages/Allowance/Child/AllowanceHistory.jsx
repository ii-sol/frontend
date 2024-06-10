import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import HistoryFilter from "~/components/common/HistoryFilter";

const AllowanceHistory = () => {
  return (
    <Container>
      <HistoryFilter></HistoryFilter>
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
