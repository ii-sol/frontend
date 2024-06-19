import React from "react";
import tw from "twin.macro";
import { BottomBtn } from "../../styles/GlobalStyles";

const NextButton = ({ onClick }) => {
  return <BottomBtn onClick={onClick}>다음</BottomBtn>;
};

export default NextButton;
