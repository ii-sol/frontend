import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

const InvestAccHistoryListItem = ({ data }) => {
  const myName = useSelector((state) => state.user.userInfo.name);
  let amount;
  let trade;

  const renderAmount = (code) => {
    if (code == 5) {
      return <ItemAmount color="#FF4848">{amount}</ItemAmount>;
    } else {
      return <ItemAmount color="#5A74FF">{amount}</ItemAmount>;
    }
  };
  console.log(data);
  return (
    <Container>
      <Wrapper>
        <ItemContent>{renderMessage(data.messageCode)}</ItemContent>
        <ItemName>
          {amount > 0 ? "From. " : "To. "}
          {anotherName}
        </ItemName>
      </Wrapper>
      <AmountContainer>
        {renderAmount(amount)}
        <Balance>남은 돈: {"만원"}</Balance>
      </AmountContainer>
    </Container>
  );
};

export default InvestAccHistoryListItem;

const Container = styled.li`
  ${tw`flex justify-between items-center mb-5 border-b border-gray-200`}
`;

const Wrapper = styled.div`
  ${tw`flex flex-col items-start gap-2`}
  font-size: 20px;
`;

const ItemContent = styled.div``;

const ItemName = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;

const AmountContainer = styled.div`
  ${tw`flex flex-col items-end gap-2`}
`;

const ItemAmount = styled.div`
  ${tw`font-semibold`}
  font-size:20px;
  color: ${({ color }) => (color ? color : "inherit")};
`;

const Balance = styled.div`
  ${tw`text-gray-500`}
  font-size: 15px;
`;
