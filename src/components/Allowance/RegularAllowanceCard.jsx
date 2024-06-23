import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/normalizeNumber";

const RegularAllowanceCard = ({ regularAllowance }) => {
  if (!regularAllowance || regularAllowance.length === 0) {
    return <RegisterButton>아직 정기 용돈이 없어요</RegisterButton>;
  }

  return (
    <Container>
      <Content>
        <PeriodTag status={regularAllowance.period}>{regularAllowance.period}</PeriodTag>
        <Allowance>{normalizeNumber(regularAllowance.amount)}원</Allowance>
        <Period>
          {regularAllowance.createDate}~{regularAllowance.dueDate}
        </Period>
      </Content>
    </Container>
  );
};

export default RegularAllowanceCard;

const Container = styled.div`
  ${tw`
  flex
  p-5
  gap-1
  w-full
  mb-4
  `}
  background-color: white;
  height: 128px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  w-full
  mb-4
  `}
  height: 128px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 19px;
  font-weight: 600;
`;

const Content = styled.div`
  ${tw`
  flex
  flex-col
  items-start
  gap-1
  `}
`;

const PeriodTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: #346bac;
  background-color: #d5e0f1;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 17px;
  font-weight: 700;
`;

const Period = styled.div`
  font-size: 12px;
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-col h-full justify-center items-end gap-3 ml-auto`}
`;

const Button = styled.button`
  background: #f4f9ff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 80px;
  height: 27px;
  &:hover {
    background-color: rgba(151, 178, 221, 0.4);
  }
`;
