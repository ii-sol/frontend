import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { fetchHistory } from "../../services/allowance";

import HistoryListItem from "~/components/Allowance/HistoryListItem";

import EmptyImage from "~/assets/img/common/empty.svg";
import { groupDataByDate } from "../../utils/groupDataByDate";
import { useSelector } from "react-redux";

const data = [
  {
    "id": 1,
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈 조르기",
    "amount": 50000,
    "balance": "250000",
    "createdDate": "2024-05-10",
  },
  {
    "id": 2,
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "돈 보내기",
    "amount": -30000,
    "balance": "220000",
    "createdDate": "2024-06-01",
  },
  {
    "id": 3,
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "결제",
    "amount": -5000,
    "balance": "215000",
    "createdDate": "2024-06-05",
  },
  {
    "id": 4,
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "대출금",
    "amount": -50000,
    "balance": "233000",
    "createdDate": "2024-06-10",
  },
];

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
        {sortedGroupedData.length === 0 ? (
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

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
