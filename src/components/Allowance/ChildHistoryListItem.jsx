import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import { styled } from "styled-components";

import { fetchHistory } from "../../services/allowance";

import HistoryListItem from "~/components/Allowance/HistoryListItem";

import EmptyImage from "~/assets/img/common/empty.svg";
import { groupDataByDate } from "../../utils/groupDataByDate";

const ChildHistoryListItem = () => {
  const year = useSelector((state) => state.history.year);
  const month = useSelector((state) => state.history.month);
  console.log(month);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (year, month, status) => {
      try {
        const data = await fetchHistory(year, month, status);
        setData(data.response);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(year, month, 1);
  }, [year, month]);

  const groupedData = groupDataByDate(data);
  const sortedGroupedData = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  console.log(groupedData);

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
              {groupedData[date].map((item, index) => (
                <HistoryListItem key={index} data={item} />
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
