import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";

const Keypad = ({ onButtonClick }) => {
  return (
    <Container>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "←"].map(
        (value) => (
          <Button key={value} onClick={() => onButtonClick(value)}>
            {value}
          </Button>
        )
      )}
    </Container>
  );
};

export default Keypad;

const Container = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  bg-[#F0F7FF]
  rounded-[15px]
  `}

  width: 100%;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 1.25rem;
`;

const Button = styled.button`
  height: 80px;
  font-weight: 500;
  font-size: 26px;
  border-radius: 15px;
  color: black;
  &:active {
    background-color: #e9f2ff;
    -webkit-tap-highlight-color: #e9f2ff;
  }

  &:hover {
    background-color: #e9f2ff;
    -webkit-tap-highlight-color: #e9f2ff;
  }
`;
