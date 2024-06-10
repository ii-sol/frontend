import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import DateHeader from "~/components/common/DateHeader";
import HistoryList from "~/components/common/HistoryList";

const data = [
  {
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
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "결제",
    "amount": -12000,
    "balance": "203000",
    "createdDate": "2024-06-09",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈",
    "amount": 50000,
    "balance": "265000",
    "createdDate": "2024-06-10",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈",
    "amount": 50000,
    "balance": "265000",
    "createdDate": "2024-06-10",
  },
  {
    "senderAccountNum": "123-456-7890",
    "senderName": "박지민",
    "recieverAccountNum": "987-654-3210",
    "recieverName": "양은수",
    "content": "용돈",
    "amount": 50000,
    "balance": "265000",
    "createdDate": "2024-06-10",
  },
];

const getMonthlyData = (pivatDate, data) => {
  const beginTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth(), 1, 0, 0, 0).getTime(); // 1일 0시 0분 0초, getTime() 이용하여 숫자값으로 저장
  const endTime = new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 0일 즉 이전 달 마지막 날 59분 59초

  return data.filter((item) => {
    const itemTime = new Date(item.createdDate).getTime();
    return beginTime <= itemTime && itemTime <= endTime;
  });
};

const HistoryFilter = ({}) => {
  const [pivatDate, setPivatDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivatDate, data);

  const onDecreaseMonth = () => {
    setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivatDate(new Date(pivatDate.getFullYear(), pivatDate.getMonth() + 1));
  };

  return (
    <Container>
      <DateHeader title={`${pivatDate.getFullYear()}년 ${pivatDate.getMonth() + 1}월`} leftChild={<div onClick={onDecreaseMonth}>{"<"}</div>} rightChild={<div onClick={onIncreaseMonth}>{">"}</div>} />
      <HistoryList data={monthlyData} />
    </Container>
  );
};

export default HistoryFilter;

const Container = styled.div`
  ${tw`flex flex-col w-full gap-5`}
`;
