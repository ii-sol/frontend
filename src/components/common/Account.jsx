import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { normalizeNumber } from "../../utils/normalizeNumber";
import isLogin from "../../utils/isLogin";

const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = isLogin();
  const accountNum1 = useSelector((state) => state.account.accountNum1);
  const accountNum2 = useSelector((state) => state.account.accountNum2);
  const balance1 = useSelector((state) => state.account.balance1);
  const balance2 = useSelector((state) => state.account.balance2);
  const accountType = useSelector((state) => state.account.accountType);

  const theme = {
    accountType,
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountContainer>
        {!isLoggedIn ? (
          <WelcomeDiv>
            지금 바로 <br />
            iSOL 시작하기
          </WelcomeDiv>
        ) : (
          <>
            <InfoWrapper>
              <InfoDiv>{accountType === 1 ? "용돈 계좌" : "투자 계좌"}</InfoDiv>
              <AccountDiv>
                {accountType === 1 ? accountNum1 : accountNum2}
              </AccountDiv>
            </InfoWrapper>
            <BalanceDiv>
              {accountType === 1
                ? normalizeNumber(balance1)
                : normalizeNumber(balance2)}
              원
            </BalanceDiv>
          </>
        )}
        <ButtonWrapper>
          {accountType === 1 ? (
            <>
              <Btn onClick={() => navigate("/account/select")}>돈 보내기</Btn>
              <Btn onClick={() => navigate("/allowance/history")}>
                용돈 내역
              </Btn>
            </>
          ) : accountType === 2 ? (
            <>
              <Btn onClick={() => navigate("/invest/start")}>투자하기</Btn>
              <Btn onClick={() => navigate("/invest/investhistory")}>
                계좌 내역
              </Btn>
            </>
          ) : (
            <>
              <Btn onClick={() => navigate("/login")}>로그인</Btn>
              <Btn onClick={() => navigate("/signup")}>회원가입</Btn>
            </>
          )}
        </ButtonWrapper>
      </AccountContainer>
    </ThemeProvider>
  );
};

export default Account;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 13px;
  background: ${({ theme }) =>
    theme.accountType === 1
      ? "#E5EFFF"
      : theme.accountType === 2
      ? "#FFF4BD"
      : "#E5EFFF"};
  padding: 20px 26px;
  width: 305px;
  width: 100%;
  max-width: 330px;
  height: 196px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (min-width: 400px) {
    max-width: 350px;
  }
`;

const WelcomeDiv = styled.div`
  font-size: 25px;
  font-weight: 700;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  float: right;
  gap: 6px;
`;

const InfoDiv = styled.div`
  text-align: left;
`;

const AccountDiv = styled.div`
  text-align: left;
`;

const BalanceDiv = styled.div`
  font-size: 25px;
  margin: 20px auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Btn = styled.button`
  width: 120px;
  height: 45px;
  border-radius: 15px;
  border: none;
  background: ${({ theme }) =>
    theme.accountType === 1
      ? "#CDE0FF"
      : theme.accountType === 2
      ? "#FFDD86"
      : "#CDE0FF"};
  font-size: 18px;
`;
