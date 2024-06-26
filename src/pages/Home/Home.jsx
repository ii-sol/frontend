import React, { useEffect, useState } from "react";
import Account from "../../components/common/Account";
import styled from "styled-components";
import invest from "../../assets/img/Home/invest.svg";
import allowance from "../../assets/img/Home/allowance.svg";
import mission from "../../assets/img/Home/mission.svg";
import loan from "../../assets/img/Home/loan.svg";
import noti from "../../assets/img/Home/alert.svg";
import mypage from "../../assets/img/Home/mypage.svg";
import one from "../../assets/img/Home/one.svg";
import two from "../../assets/img/Home/two.svg";
import three from "../../assets/img/Home/three.svg";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/GlobalStyles";
import { store } from "../../store/stores";
import {
  fetchFamilyInfo,
  loginSuccess,
  logout,
} from "../../store/reducers/Auth/user";
import isLogin from "../../utils/isLogin";
import { fetchMyInfo } from "../../services/home";
import { baseInstance } from "../../services/api";
import { normalizeNumber } from "../../utils/normalizeNumber";
import {
  fetchMyAccount,
  setAccountType,
} from "../../store/reducers/Account/account";
import { useDispatch, useSelector } from "react-redux";

//TODO name
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = isLogin();
  const accountType = useSelector((state) => state.account.accountType);
  const [userInfo, setUserInfo] = useState(null);

  const userName = useSelector((state) => state.user.userInfo.name);
  const familyInfo = useSelector((state) => state.user.userInfo.familyInfo);
  const [score, setScore] = useState(0);
  const [grad, setGrad] = useState("보통");
  const [baseRate, setBaseRate] = useState(0);
  const [loanLimit, setLoanLimit] = useState(0);
  const [investLimit, setInvestLimit] = useState(0);

  useEffect(() => {
    const getMyInfo = async () => {
      const data = await fetchMyInfo();
      console.log(data);
      setUserInfo(data.response);
    };

    if (isLoggedIn) {
      getMyInfo();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setAccountType(1));
      dispatch(fetchMyAccount());
    } else {
      dispatch(setAccountType(0));
    }
  }, [isLoggedIn, accountType]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const creditResponse = await baseInstance.get("/users/child-manage");
      console.log(creditResponse);
      const baseRate1 = creditResponse.data.response.baseRate || 3;
      const loanLimit1 = creditResponse.data.response.loanLimit || 100;
      const investLimit1 = creditResponse.data.response.investLimit || 200;

      setBaseRate(baseRate1);
      setLoanLimit(loanLimit1);
      setInvestLimit(investLimit1);

      // Fetch score
      const scoreResponse = await baseInstance.get("/users/score");
      const fetchedScore = scoreResponse.data.response || 0;

      console.log(fetchedScore);
      setScore(fetchedScore);

      // Adjust rate and limits based on score
      if (fetchedScore <= 19) {
        setGrad("매우 낮음");
        setBaseRate(Math.max(baseRate1 + 2, 0)); // 기준 금리보다 2% 높음
        setLoanLimit(Math.max(loanLimit1 - 100, 0)); // 기준 상한 금액보다 100만원 낮음
        setInvestLimit(Math.max(investLimit1 - 100, 0)); // 기준 상한 금액보다 100만원 낮음
      } else if (fetchedScore <= 39) {
        setGrad("낮음");
        setBaseRate(Math.max(baseRate1 + 1, 0)); // 기준 금리보다 1% 높음
        setLoanLimit(Math.max(loanLimit1 - 50, 0)); // 기준 상한 금액보다 50만원 낮음
        setInvestLimit(Math.max(investLimit1 - 50, 0)); // 기준 상한 금액보다 50만원 낮음
      } else if (fetchedScore <= 59) {
        setGrad("보통");
        setBaseRate(baseRate1); // 기준 금리
        setLoanLimit(loanLimit1); // 기준 상한 금액
        setInvestLimit(investLimit1); // 기준 상한 금액
      } else if (fetchedScore <= 79) {
        setGrad("높음");
        setBaseRate(Math.max(baseRate1 - 1, 0)); // 기준 금리보다 1% 낮음
        setLoanLimit(loanLimit1 + 50); // 기준 상한 금액보다 50만원 높음
        setInvestLimit(investLimit1 + 50); // 기준 상한 금액보다 50만원 높음
      } else if (fetchedScore <= 100) {
        setGrad("매우 높음");
        setBaseRate(Math.max(baseRate1 - 2, 0)); // 기준 금리보다 2% 낮음
        setLoanLimit(loanLimit1 + 100); // 기준 상한 금액보다 100만원 높음
        setInvestLimit(investLimit1 + 100); // 기준 상한 금액보다 100만원 높음
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFamilyInfo());
    }
  }, []);

  const handleNavigation = (path) => {
    if (familyInfo.length === 0) {
      alert("부모 계정을 연결하세요!");
      navigate("/mypage");
    } else {
      navigate(path);
    }
  };

  return (
    <S.Container>
      <div onClick={() => store.dispatch(logout())}>logout</div>
      {isLoggedIn ? (
        <Wrapper>
          <div
            style={{ color: "#404040", fontSize: "25px", fontWeight: "700" }}
          >
            안녕하세요! <br />
            {userName}님
          </div>
          <S.RowDiv style={{ gap: "20px" }}>
            <img
              src={mypage}
              style={{ width: "42px" }}
              onClick={() => navigate("/mypage")}
            />
            <img
              src={noti}
              style={{ width: "42px" }}
              onClick={() => navigate("/notification")}
            />
          </S.RowDiv>
        </Wrapper>
      ) : (
        <></>
      )}

      <S.CenterDiv>
        <Account />
      </S.CenterDiv>
      <RowDiv $isFirst>
        <Btn
          $width={1}
          $back="#FFDEDE"
          onClick={() => handleNavigation("/invest")}
        >
          투자하기
          <Img src={invest} $right={10} $imgwidth={140} />
        </Btn>
        <Btn
          $width={2}
          $back="#E3FFD5"
          onClick={() => handleNavigation("/allowance/irregular")}
        >
          용돈
          <br />
          조르기
          <Img src={allowance} $bottom={10} $right={0} $imgwidth={80} />
        </Btn>
      </RowDiv>
      <RowDiv>
        <Btn
          $width={2}
          $back="#FFFEE3"
          onClick={() => handleNavigation("/mission")}
        >
          미션
          <Img src={mission} $bottom={10} $right={5} $imgwidth={90} />
        </Btn>
        <Btn
          $width={1}
          $back="#FFE8F2"
          onClick={() => handleNavigation("/loan/main")}
        >
          대출하기
          <Img src={loan} $bottom={10} $right={10} $imgwidth={90} />
        </Btn>
      </RowDiv>
      {isLoggedIn ? (
        <ColumnDiv>
          <BottomDiv>
            <BImg src={one} />
            <Div>
              {userName}님의 금리는 <br />
              {baseRate}%입니다.
            </Div>
          </BottomDiv>
          <BottomDiv>
            <BImg src={two} />
            <Div>
              {userName}님의 대출 상한선은 <br />
              {normalizeNumber(loanLimit)}만원입니다.
            </Div>
          </BottomDiv>
          <BottomDiv $isLast>
            <BImg src={three} />
            <Div>
              {userName}님의 투자 상한선은
              <br />
              {normalizeNumber(investLimit)}만원입니다.
            </Div>
          </BottomDiv>
        </ColumnDiv>
      ) : (
        <></>
      )}
    </S.Container>
  );
};

export default Home;

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0px;
`;

const Btn = styled.div`
  position: relative;
  width: ${(props) =>
    props.$width === 1 ? "calc(57vw - 20px)" : "calc(43vw - 20px)"};
  height: 155px;
  border-radius: 15px;
  background: ${(props) => props.$back};
  box-shadow: 0px 0px 5px 0px #d8d8d8;
  margin-top: 20px;
  padding: 15px;
  font-size: 22px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: ${(props) => (props.$isFirst ? "20px" : "0px")};
`;

const Img = styled.img`
  position: absolute;
  bottom: ${(props) => (props.$bottom ? `${props.$bottom}px` : "0")};
  right: ${(props) => (props.$right ? `${props.$right}px` : "0")};
  width: ${(props) => props.$imgwidth}px;
`;

const ColumnDiv = styled.div`
  margin-top: 20px;
`;

const BottomDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid #B0B0B0")};
`;

const BImg = styled.img`
  width: 55px;
`;

const Div = styled.div`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;
