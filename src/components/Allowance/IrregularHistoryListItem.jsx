import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllowanceRequestHistory } from "../../store/reducers/Allowance/allowance";
import { PuffLoader } from "react-spinners";

import RequestHistoryCard from "./RequestHistoryCard";

import AllowanceImage from "~/assets/img/Allowance/allowanceRequest.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const IrregularHistoryListItem = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allowance.data);
  const loading = useSelector((state) => state.allowance.loading);
  const { year, month } = useSelector((state) => state.history);
  const { status } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchAllowanceRequestHistory({ year: year, month: month }));
  }, [dispatch, year, month]);

  const filterData = (data) => {
    if (status === 0) {
      return data;
    } else if (status === 1) {
      return data.filter((item) => item.status === 4);
    } else if (status === 2) {
      return data.filter((item) => item.status === 5 || item.status === 6);
    }
    return data;
  };

  const filteredData = filterData(data);

  return (
    <Container>
      <List>
        {loading ? (
          <LoadingState>
            <PuffLoader color="#4056c1" />
          </LoadingState>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <EmptyState>
                <Img src={EmptyImage} alt="No data" />
                <EmptyText>용돈 조르기 내역이 없어요</EmptyText>
              </EmptyState>
            ) : (
              <S.CardContainer>
                {filteredData.map((item, index) => (
                  <RequestHistoryCard key={index} status={item.status} receiver={item.name} allowance={item.amount} img={AllowanceImage} createdDate={item.createDate} />
                ))}
              </S.CardContainer>
            )}{" "}
          </>
        )}
      </List>
    </Container>
  );
};

export default IrregularHistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;

const LoadingState = styled.div`
  ${tw`flex items-center justify-center h-full mt-20`}
`;
