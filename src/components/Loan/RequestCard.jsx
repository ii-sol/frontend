import React from "react";
import tw, { styled } from "twin.macro";
import ReceiveIcon from "~/assets/img/common/receive.svg";
import SendIcon from "~/assets/img/common/send.svg";

const RequestCard = ({ status, name, title, dday, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Img src={status === 1 ? SendIcon : ReceiveIcon} alt="Message Icon" />
      <Content>
        <Name>{status === 1 ? `To. ${name}` : `From. ${name}`}</Name>
        <Title>{title}</Title>
      </Content>
      <StatusWrapper>
        <StatusTag dday={dday}>{dday === 0 ? "D-day" : `D-${dday}`}</StatusTag>
      </StatusWrapper>
    </Container>
  );
};

export default RequestCard;

const Container = styled.div`
  ${tw`flex items-center bg-[#F4F9FF] w-full rounded-2xl text-lg p-4 my-4 shadow-md cursor-pointer`}
`;

const Img = styled.img`
  ${tw`mr-4 w-10 h-10`}
`;

const Content = styled.div`
  ${tw`flex flex-col flex-grow`}
`;

const Name = styled.p`
  ${tw`text-lg`}
`;

const Title = styled.p`
  ${tw`font-bold text-lg`}
`;

const StatusWrapper = styled.div`
  ${tw`ml-auto`}
`;

const StatusTag = styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 3px 0px;
  border-radius: 5px;
  color: ${({ dday }) =>
    dday === 0 ? "#CC3535" : dday ? "#346BAC" : "#000000"};
  background-color: ${({ dday }) =>
    dday === 0 ? "#FFDCDC" : dday ? "#D5E0F1" : "#FFFFFF"};
`;
