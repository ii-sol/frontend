import React from "react";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AllowanceRequestHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 조르기"} right={""} />
      <HistoryFilter />
    </Container>
  );
};

export default AllowanceRequestHistory;
