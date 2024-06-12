import React from "react";

import Header from "~/components/common/Header";
import HistoryFilter from "~/components/common/History/HistoryFilter";

const AllowanceHistory = () => {
  return (
    <Container>
      <Header left={"<"} title={"용돈 내역"} right={"취소"} />
      <HistoryFilter />
    </Container>
  );
};

export default AllowanceHistory;
