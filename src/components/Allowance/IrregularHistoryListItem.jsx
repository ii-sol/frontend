import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import RequestHistoryCard from "./RequestHistoryCard";

import PleaseImg from "~/assets/img/Allowance/please.svg";
import HeartImg from "~/assets/img/Allowance/heart.svg";
import EmptyImage from "~/assets/img/common/empty.svg";

const IrregularHistoryListItem = () => {
  const data = [
    { id: 1, status: "완료", receiver: "엄마", allowance: 1000, img: PleaseImg, createdDate: "2024-05-31" },
    { id: 2, status: "취소", receiver: "엄마", allowance: 1000, img: PleaseImg, createdDate: "2024-06-04" },
    { id: 3, status: "취소", receiver: "아빠", allowance: 5000, img: HeartImg, createdDate: "2024-06-11" },
  ];

  const renderItem = (item) => {
    return <RequestHistoryCard key={item.id} status={item.status} receiver={item.receiver} allowance={item.allowance} img={item.img} createdDate={item.createdDate} />;
  };

  return (
    <Container>
      <List>
        {data.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>용돈 조르기 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          <S.CardContainer>{data.map((item) => renderItem(item))}</S.CardContainer>
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
