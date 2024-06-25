import React, { useEffect, useState } from "react";
import Header from "../../components/Investment/Header";
import Account from "../../components/common/Account";
import { styled } from "styled-components";
import PortfolioDonut from "../../components/Investment/PortfolioDonut";
import PortfolioList from "../../components/Investment/PortfolioList";
import * as S from "../../styles/GlobalStyles";
import tw from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../../store/reducers/Invest/portfolio";
import {
  fetchInvestAccount,
  setAccountType,
} from "../../store/reducers/Account/account";
import { useNavigate } from "react-router-dom";

const InvestMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDonut, setIsDonut] = useState(true);
  const accountType = useSelector((state) => state.account.accountType);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, []);

  useEffect(() => {
    dispatch(setAccountType(2));
    dispatch(fetchInvestAccount());
  }, [accountType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        <Page>
          <Account />
          <Menu>
            <S.HistoryLink onClick={() => navigate("/invest/tradehistory")}>
              투자 내역 &gt;
            </S.HistoryLink>
          </Menu>
          {isDonut ? (
            <PortfolioDonut toggleShow={toggleShow} />
          ) : (
            <PortfolioList toggleShow={toggleShow} />
          )}
        </Page>
      </CenterWrapper>
    </S.Container>
  );
};

export default InvestMain;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Menu = styled.div`
  ${tw`
  items-center
  `}

  margin-left:auto;
`;
