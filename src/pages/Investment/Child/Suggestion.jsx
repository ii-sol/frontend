import React, { useState } from "react";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { styled } from "styled-components";
import suggest from "../../../assets/img/Invest/suggest.svg";
import Message from "../../../components/common/Message";
import { useNavigate } from "react-router-dom";

const Suggestion = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleInputChange = (message) => {
    setMessage(message);
  };
  const info = {
    "투자 종목": "삼성전자",
    시장가: "123,120원",
    개수: "3주",
  };

  const onSuggest = () => {
    navigate("/invest/send", {
      state: { type: "suggest", data: { who: "엄마", what: "투자제안서" } },
    });
  };
  return (
    <S.Container>
      <Header type="none" />
      <S.CenterDiv>
        <Div $size="25" $top="20">
          엄마에게
          <br />
          삼성전자 투자를 제안드릴게요
        </Div>
        <Div $size="15" $top="10">
          해당 투자가 합리적인 이유를
          <br />
          작성해주세요!
        </Div>
        <S.Badge $back="#FFDCDC" $font="#CC3535">
          구매
        </S.Badge>
        <Img src={suggest} />
        <Wrapper>
          <Message
            placeholder="투자 제안 메세지를 적어주세요!"
            maxLength="100"
            onChange={handleInputChange}
            info={info}
          />
        </Wrapper>
        <S.BottomBtn2 onClick={() => onSuggest()}>제안하기</S.BottomBtn2>
      </S.CenterDiv>
    </S.Container>
  );
};

export default Suggestion;

const Div = styled.div`
  font-size: ${(props) => props.$size}px;
  text-align: center;
  margin-top: ${(props) => props.$top}px;
`;

const Img = styled.img`
  margin-top: -70px;
`;

const Wrapper = styled.div`
  margin-top: -30px;
  width: 100%;
`;
