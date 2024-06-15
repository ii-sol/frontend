import React from "react";
import { styled } from "styled-components";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const MissionHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"미션 내역"} right={""} />
      <HistoryFilter />
    </Container>
  );
};

export default MissionHistory;

const Container = styled.div``;
