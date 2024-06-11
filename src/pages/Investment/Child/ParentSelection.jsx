import React from "react";
import Member from "../../../components/common/Member";
import ChildImage from "~/assets/img/Auth/child.png";
import { styled } from "styled-components";
import tw from "twin.macro";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { useLocation, useNavigate } from "react-router-dom";

const ParentSelection = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <S.Container>
      <Header type="none" />
      <Div>누구에게 용돈을 부탁할까요?</Div>
      <MemberContainer>
        <Member
          img={ChildImage}
          name="엄마"
          role="부모"
          phoneNum="010-0000-0000"
        ></Member>
        <Member
          img={ChildImage}
          name="아빠"
          role="부모"
          phoneNum="010-4321-4321"
        ></Member>
      </MemberContainer>
      <S.BottomBtn
        onClick={() =>
          navigate("/invest/suggest", {
            state: { type: state.type, trade: state.trade },
          })
        }
      >
        다음
      </S.BottomBtn>
    </S.Container>
  );
};

export default ParentSelection;

const MemberContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-3
  `}
`;

const Div = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 30px auto;
  font-weight: 600;
`;
