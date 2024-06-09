import React, { useState } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import { FiXCircle } from "react-icons/fi";

const Message = ({ placeholder, maxLength, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const calculateHeight = (maxLength) => {
    const lineHeight = 40;
    const lines = Math.ceil(maxLength / 30);
    return lines * lineHeight + 40;
  };

  const height = calculateHeight(maxLength);

  return (
    <Container height={height}>
      <Textarea placeholder={placeholder} value={inputValue} onChange={handleChange} maxLength={maxLength} />
      {inputValue.length > 0 && (
        <ClearButton onClick={handleClearInput}>
          <FiXCircle />
        </ClearButton>
      )}
      <CharacterCount>
        {inputValue.length}/{maxLength}
      </CharacterCount>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f4f9ff;
  border-radius: 15px;
  height: ${(props) => props.height + 60}px;
`;

const Textarea = styled.textarea`
  width: 85%;
  height: ${(props) => props.height}px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  resize: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::placeholder {
    color: #c9c9c9;
  }
`;

const ClearButton = styled.button`
  ${tw`flex items-center justify-center w-8 h-8 text-gray-500 cursor-pointer outline-none`}
  position: absolute;
  right: 15px;
  bottom: 40%;
  background: none;
  border: none;
`;

const CharacterCount = styled.div`
  ${tw`text-gray-500 mt-2`}
`;
