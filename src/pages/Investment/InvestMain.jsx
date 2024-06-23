import React, { useEffect, useState } from "react";
import Header from "../../components/Investment/Header";
import Account from "../../components/common/Account";
import { styled } from "styled-components";
import PortfolioDonut from "../../components/Investment/PortfolioDonut";
import PortfolioList from "../../components/Investment/PortfolioList";
import * as S from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { fetchPortfolio } from "../../store/reducers/Invest/portfolio";

const InvestMain = () => {
  const dispatch = useDispatch();
  const [isDonut, setIsDonut] = useState(true);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, []);

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        <Page>
          <Account accountNum={1} />
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
