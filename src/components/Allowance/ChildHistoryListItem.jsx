import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { fetchHistory } from "../../services/allowance";

import HistoryListItem from "~/components/Allowance/HistoryListItem";

import EmptyImage from "~/assets/img/common/empty.svg";
import { groupDataByDate } from "../../utils/groupDataByDate";

const ChildHistoryListItem = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHistory(0, 2024, 6, 0);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     senderName: "박지민",
  //     recieverName: "양은수",
  //     content: "용돈 조르기",
  //     amount: 50000,
  //     balance: "250000",
  //     createdDate: "2024-05-10",
  //   },
  //   {
  //     id: 2,
  //     senderName: "박지민",
  //     recieverName: "양은수",
  //     content: "용돈 조르기",
  //     amount: 50000,
  //     balance: "250000",
  //     createdDate: "2024-05-10",
  //   },
  //   {
  //     id: 3,
  //     senderName: "박지민",
  //     recieverName: "양은수",
  //     content: "용돈 조르기",
  //     amount: 50000,
  //     balance: "250000",
  //     createdDate: "2024-05-10",
  //   },
  // ];

  const groupedData = groupDataByDate(data);
  const sortedGroupedData = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

  return (
    <Container>
      <List>
        {isLoading ? (
          <LoadingState>Loading...</LoadingState>
        ) : sortedGroupedData.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>용돈 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          sortedGroupedData.map((date, index) => (
            <DateGroup key={index}>
              <DateArea>{date}</DateArea>
              <Hr />
              {groupedData[date].map((item) => (
                <HistoryListItem key={item.id} content={item.content} amount={item.amount} balance={item.balance} />
              ))}
            </DateGroup>
          ))
        )}
      </List>
    </Container>
  );
};

export default ChildHistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const DateGroup = styled.div`
  ${tw`mb-9`}
`;

const DateArea = styled.div`
  ${tw`font-medium mb-2 text-[#949494]`}
  font-size: 12px;
`;

const Hr = styled.hr`
  ${tw`mb-2`}
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
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;
