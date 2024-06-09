import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const RequestCard = ({ receiver, allowance, img }) => {
  const normalizeNumber = (number) => {
    return parseFloat(number).toLocaleString("en-US");
  };

  return (
    <Container>
      <Content>
        <Receiver>{receiver}</Receiver>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
      </Content>
      <Img src={img} alt="아이콘" />
    </Container>
  );
};

export default RequestCard;

const Container = styled.button`
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

const Receiver = styled.div`
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;

const Img = styled.img`
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 78px;
  height: auto;
`;
