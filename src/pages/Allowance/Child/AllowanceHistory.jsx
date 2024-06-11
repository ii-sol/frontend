import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/HistoryFilter";

const AllowanceHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={"취소"} />
      <HistoryFilter></HistoryFilter>
    </Container>
  );
};

export default AllowanceHistory;

const Container = styled.div``;
