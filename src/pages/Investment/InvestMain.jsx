import React, { useState } from "react";
import Header from "../../components/Investment/Header";
import Account from "../../components/common/Account";
import { styled } from "styled-components";
import PortfolioDonut from "../../components/Investment/PortfolioDonut";
import PortfolioList from "../../components/Investment/PortfolioList";
import * as S from "../../styles/GlobalStyles";

const InvestMain = () => {
  const [isDonut, setIsDonut] = useState(true);
  const [height, setHeight] = useState(0);

  const toggleShow = () => {
    setIsDonut(!isDonut);
  };

  return (
    <S.Container>
      <Header />
      <CenterWrapper>
        <Page>
          <Account accountNum={1} />
          {isDonut ? (
            <PortfolioDonut toggleShow={toggleShow} setHeight={setHeight} />
          ) : (
            <PortfolioList toggleShow={toggleShow} height={height} />
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
