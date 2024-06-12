import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import ReceiveIcon from "~/assets/img/common/receive.svg";
import SendIcon from "~/assets/img/common/send.svg";

const RequestCard = ({ status, name, content, dday }) => {
  return (
    <Container>
      <Img src={status === "send" ? SendIcon : ReceiveIcon} alt="Message Icon" />
      <div>
        <p>{status === "send" ? `To.${name}` : `From.${name}`}</p>
        <p tw="font-bold">{content}</p>
      </div>
      {/* <div tw="ml-auto">
        <p tw="text-blue-500">{parseInt(dday, 10) === 0 ? "D-day" : `D-${dday}`}</p>
      </div> */}
    </Container>
  );
};

export default RequestCard;

const Container = styled.div`
  ${tw`flex items-center bg-[#F4F9FF] w-full rounded-2xl text-lg p-4 my-4 shadow-md`}
`;

const Img = styled.img`
  ${tw`mr-4 w-10 h-10`}
`;
