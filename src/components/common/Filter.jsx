import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Filter = ({ statusOptions, selectedStatus, onChangeStatus }) => {
  return (
    <Container>
      {statusOptions.map((status) => (
        <Button key={status} selected={selectedStatus === status} onClick={() => onChangeStatus(status)}>
          {status}
        </Button>
      ))}
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  ${tw`flex gap-3 mb-4`}
`;

const Button = styled.button`
  ${tw`px-4 py-2 rounded-[5px] font-bold border-none`}
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  ${({ selected }) => selected && tw`bg-[#154B9B] text-[#FFFFFF]`}
  ${({ selected }) => !selected && tw`bg-[#F4F9FF] text-[#949494]`}
`;
