import React, { useState } from "react";
import Member from "../../../components/common/Member";
import ChildImage from "~/assets/img/Auth/child.svg";
import { styled } from "styled-components";
import tw from "twin.macro";
import * as S from "../../../styles/GlobalStyles";
import Header from "../../../components/Investment/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setParent } from "../../../store/reducers/Invest/invest";

const ParentSelection = () => {
  const dispatch = useDispatch();
  const [parents, setParents] = useState(null);
  const navigate = useNavigate();

  return (
    <S.Container>
      <Header type="none" />
      <Div>누구에게 투자 제안을 할까요?</Div>
      <MemberContainer>
        <Member
          img={ChildImage}
          name="엄마"
          role="부모"
          phoneNum="010-0000-0000"
          onClick={() => setParents(333)}
        />
        <Member
          img={ChildImage}
          name="아빠"
          role="부모"
          phoneNum="010-4321-4321"
          onClick={() => setParents(444)}
        />
      </MemberContainer>
      <S.BottomBtn
        onClick={() => {
          navigate("/invest/suggest");
          dispatch(setParent(parents));
        }}
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
