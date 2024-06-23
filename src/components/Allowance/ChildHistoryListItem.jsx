import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import { styled } from "styled-components";

// import { fetchHistory } from "../../services/allowance";

import HistoryListItem from "~/components/Allowance/HistoryListItem";

import EmptyImage from "~/assets/img/common/empty.svg";
import { groupDataByDate } from "../../utils/groupDataByDate";

const ChildHistoryListItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { year, month, status } = useSelector((state) => state.history);

  const accessToken = useSelector((state) => state.user.accessToken);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await fetchHistory(accessToken, year, month, status);

  //       setData(data);
  //     } catch (error) {
  //       console.error("Error fetching history:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [accessToken, year, month, status]);

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
