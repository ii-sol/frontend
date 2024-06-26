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
import { loginSuccess, logout } from "../../store/reducers/Auth/user";
import isLogin from "../../utils/isLogin";
import { fetchMyInfo } from "../../services/home";
import { normalizeNumber } from "../../utils/normalizeNumber";
import {
  fetchMyAccount,
  setAccountType,
} from "../../store/reducers/Account/account";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = isLogin();
  const accountType = useSelector((state) => state.account.accountType);
  const [userInfo, setUserInfo] = useState(null);
  let myName;
  if (isLoggedIn) {
    myName = useSelector((state) => state.user.userInfo.name);
  }

  useEffect(() => {
    const getMyInfo = async () => {
      const data = await fetchMyInfo();
      console.log(data);
      setUserInfo(data.response);
    };

    if (isLoggedIn) {
      getMyInfo();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setAccountType(1));
      dispatch(fetchMyAccount());
    } else {
      dispatch(setAccountType(0));
    }
  }, [isLoggedIn, accountType]);
  console.log(userInfo);

  return (
    <S.Container>
      {isLoggedIn ? (
        <Wrapper>
          <div
            style={{ color: "#404040", fontSize: "25px", fontWeight: "700" }}
          >
            안녕하세요! <br />
            {myName}님
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
        <Btn $width={1} $back="#FFDEDE" onClick={() => navigate("/invest")}>
          투자하기
          <Img src={invest} $right={10} $imgwidth={140} />
        </Btn>
        <Btn
          $width={2}
          $back="#E3FFD5"
          onClick={() => navigate("/allowance/irregular")}
        >
          용돈
          <br />
          조르기
          <Img src={allowance} $bottom={10} $right={0} $imgwidth={80} />
        </Btn>
      </RowDiv>
      <RowDiv>
        <Btn $width={2} $back="#FFFEE3" onClick={() => navigate("/mission")}>
          미션
          <Img src={mission} $bottom={10} $right={5} $imgwidth={90} />
        </Btn>
        <Btn $width={1} $back="#FFE8F2" onClick={() => navigate("/loan/main")}>
          대출하기
          <Img src={loan} $bottom={10} $right={10} $imgwidth={90} />
        </Btn>
      </RowDiv>
      {isLoggedIn ? (
        <ColumnDiv>
          <BottomDiv>
            <BImg src={one} />
            <Div>
              {myName}님의 금리는 <br />
              {userInfo?.baseRate}%입니다.
            </Div>
          </BottomDiv>
          <BottomDiv>
            <BImg src={two} />
            <Div>
              {myName}님의 대출 상한선은 <br />
              {normalizeNumber(userInfo?.loanLimit)}만원입니다.
            </Div>
          </BottomDiv>
          <BottomDiv $isLast>
            <BImg src={three} />
            <Div>
              {myName}님의 투자 상한선은
              <br />
              {normalizeNumber(userInfo?.investLimit)}만원입니다.
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
