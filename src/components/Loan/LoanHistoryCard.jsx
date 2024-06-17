import React from "react";
import tw from "twin.macro";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoanHistoryCard = ({ status, title, amount, createDate, dueDate }) => (
  <Card>
    <StatusBadge status={status}>
      {status === "4" ? "완료" : "거절"}
    </StatusBadge>
    <Title>{title}</Title>
    <Amount>{amount}원</Amount>
    <DateRange>
      {createDate} ~ {dueDate}
    </DateRange>
  </Card>
);

LoanHistoryCard.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
};

export default LoanHistoryCard;

const Card = styled.div`
  ${tw`bg-white w-full h-52 rounded-2xl shadow-lg flex flex-col p-4`}
`;

const StatusBadge = styled.span`
  ${tw`py-1 px-4 rounded-full mb-2 ml-4 w-16 mt-5 text-white`}
  ${({ status }) => (status === "4" ? tw`bg-blue-500` : tw`bg-red-500`)}
`;

const Title = styled.span`
  ${tw`text-lg font-bold`}
`;

const Amount = styled.span`
  ${tw`text-lg font-bold ml-4 mt-1`}
`;

const DateRange = styled.span`
  ${tw`text-xs text-gray-500 mt-2 ml-4`}
`;
