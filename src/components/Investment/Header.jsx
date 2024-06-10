import React from "react";
import tw from "twin.macro";
import { MdArrowBackIos } from "react-icons/md";
import note from "../../assets/img/Invest/note.svg";
import whitenote from "../../assets/img/Invest/whitenote.svg";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Header = ({ type }) => {
  const navigate = useNavigate();
  return (
    <header tw="flex justify-between items-center py-4">
      <button tw="text-2xl" onClick={() => navigate(-1)}>
        <MdArrowBackIos />
      </button>
      <h1 tw="text-2xl font-bold">투자</h1>
      {type ? (
        <StyledButton>
          <img src={whitenote} />
        </StyledButton>
      ) : (
        <button tw="text-lg">
          <img src={note} />
        </button>
      )}
    </header>
  );
};

export default Header;

const StyledButton = styled.button`
  ${tw`text-lg cursor-default`}
`;
