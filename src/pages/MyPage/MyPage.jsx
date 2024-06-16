import React from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

import Header from "~/components/common/Header";
import Profile from "../../components/MyPage/Profile";

const MyPage = () => {
  return (
    <S.Container>
      <Header left={"<"} title={"마이페이지"} right={""} />
      <S.StepWrapper>
        <Profile />

        <S.Phrase>연결 관리</S.Phrase>
      </S.StepWrapper>
    </S.Container>
  );
};

export default MyPage;
