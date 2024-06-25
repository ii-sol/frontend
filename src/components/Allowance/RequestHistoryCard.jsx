import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/normalizeNumber";

const RequestHistoryCard = ({ dday, status, receiver, allowance, img, message, createdDate }) => {
  return (
    <Container>
      <Content>
        {dday && <DdayTag dday={dday}>{dday === "0" ? "D-day" : `D-${dday}`}</DdayTag>}
        {status && <StatusTag status={status}>{status === 4 ? "완료" : status === 5 ? "거절" : "취소"}</StatusTag>}
        <Receiver>{receiver}</Receiver>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
        <Message>{message}</Message>
        <Message>
          {createdDate[0]}-{createdDate[1]}-{createdDate[2]}
        </Message>
      </Content>
      <Img src={img} alt="아이콘" />
    </Container>
  );
};

export default RequestHistoryCard;

const Container = styled.div`
  ${tw`
  flex
  flex-col
  p-5
  gap-1
  relative
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const DdayTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ dday }) => (dday === "0" ? "#CC3535" : "#346BAC")};
  background-color: ${({ dday }) => (dday === "0" ? "#FFDCDC" : "#D5E0F1")};
`;

const Receiver = styled.div`
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;

const Message = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const Img = styled.img`
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 78px;
  height: auto;
`;

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ status }) => (status === 4 ? "#CC3535" : "#346BAC")};
  background-color: ${({ status }) => (status === 4 ? "#FFDCDC" : "#D5E0F1")};
`;
