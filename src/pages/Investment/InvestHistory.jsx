import React from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import HistoryFilter from "../../components/common/History/HistoryFilter";

const InvestHistory = () => {
  return (
    <S.Container>
      <Header type="none" />
      <HistoryFilter />
    </S.Container>
  );
};

export default InvestHistory;
