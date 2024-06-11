import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import Filter from "~/components/common/Filter";
import HistoryListItem from "~/components/Allowance/HistoryListItem";

import EmptyImage from "~/assets/img/common/empty.svg";

const filterOptions = ["전체", "나간 돈", "들어온 돈"];

const HistoryList = ({ data }) => {
  const [sortType, setSortType] = useState("전체");

  const onChangeSortType = (status) => {
    setSortType(status);
  };

  const getSortedData = () => {
    const filteredData = sortType === "전체" ? data : data.filter((item) => item.status === sortType);

    return filteredData.sort((a, b) => {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  };

  const groupDataByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = item.createdDate.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const sortedData = getSortedData();
  const groupedData = groupDataByDate(sortedData);
  const sortedGroupedData = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

  return (
    <Container>
      <Filter options={filterOptions} selectedOption={sortType} onChangeOption={onChangeSortType}></Filter>
      <List>
        {sortedGroupedData.length === 0 ? (
          <EmptyState>
            <Img src={EmptyImage} alt="No data" />
            <EmptyText>용돈 내역이 없어요</EmptyText>
          </EmptyState>
        ) : (
          sortedGroupedData.map((date) => (
            <DateGroup key={date}>
              <DateHeader>{date}</DateHeader>
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

export default HistoryList;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-4`}
`;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const DateGroup = styled.div`
  ${tw`mb-9`}
`;

const DateHeader = styled.div`
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
