import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import * as S from "../../../styles/GlobalStyles";
import EmptyImage from "~/assets/img/common/empty.svg";
import LoanHistoryCard from "../../../components/Loan/LoanHistoryCard";

const LoanHistoryListItem = () => {
  const data = [
    {
      id: 1,
      status: "4",
      createdDate: "2024-05-31",
      title: "자전거",
      dueDate: "2025-06-30",
      amount: "10000",
    },
    {
      id: 2,
      status: "5",
      createdDate: "2024-05-31",
      title: "닌텐도",
      dueDate: "2025-06-30",
      amount: "10000",
    },
    {
      id: 3,
      status: "4",
      createdDate: "2024-05-31",
      title: "맥북",
      dueDate: "2025-06-30",
      amount: "10000",
    },
  ];

  const renderItem = (item) => (
    <LoanHistoryCard
      key={item.id}
      status={item.status}
      title={item.title}
      createDate={item.createdDate}
      dueDate={item.dueDate}
      amount={item.amount}
    />
  );

  return (
    <Container>
      <List>
        {data.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>대출 신청 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <S.CardContainer>
            {data.map((item) => renderItem(item))}
          </S.CardContainer>
        )}
      </List>
    </Container>
  );
};

export default LoanHistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%;
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;
