import React, { useEffect, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import SuggestionDetailComp from "../../components/Investment/SuggestionDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchProposalDetail } from "../../store/reducers/Invest/suggestDetail";

const SuggestionDetail = () => {
  const dispatch = useDispatch();
  const pathVariable = useSelector((state) => state.invest.pathVariable);
  const proposeId = useSelector((state) => state.invest.proposeId);
  console.log("pathVariable", pathVariable);
  console.log("proposeId", proposeId);
  useEffect(() => {
    dispatch(
      fetchProposalDetail({ proposeId: proposeId, pathVariable: pathVariable })
    );
  }, [proposeId, pathVariable]);

  return (
    <S.Container>
      <Header type="none" title="투자 제안서" />
      <SuggestionDetailComp />
    </S.Container>
  );
};

export default SuggestionDetail;
