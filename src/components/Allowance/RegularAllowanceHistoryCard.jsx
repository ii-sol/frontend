import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

import { normalizeNumber } from "../../utils/normalizeNumber";

  return (
    <Container>
      <Content>
        <Status>정기용돈</Status>
        <Allowance>{normalizeNumber(allowance)}원</Allowance>
      </Content>
    </Container>
  );
};

export default RegularAllowanceHistoryCard;

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
  background: rgba(151, 178, 221, 0.4);
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

const Status = styled.div`
  font-size: 13px;
  font-weight: 700;
`;

const Allowance = styled.div`
  color: #154b9b;
  font-size: 15px;
  font-weight: 700;
`;
