import React from "react";
import Account from "../../../components/common/Account";
import styled from "styled-components";
import backgroundImage from "../../../assets/img/Home/mainback.svg";
import invest from "../../../assets/img/Home/invest.svg";
import allowance from "../../../assets/img/Home/allowance.svg";
import mission from "../../../assets/img/Home/mission.svg";
import loan from "../../../assets/img/Home/loan.svg";

const Home = () => {
  return (
    <Container>
      <Account $accountNum={1}></Account>
      <RowDiv $isFirst>
        <Btn $width={165}>
          투자하기
          <Img src={invest} $right={10} $imgwidth={130} />
        </Btn>
        <Btn $width={115}>
          용돈
          <Img src={allowance} $bottom={-10} $right={-20} $imgwidth={140} />
          <br />
          조르기
        </Btn>
      </RowDiv>
      <RowDiv>
        <Btn $width={115}>
          미션
          <Img src={mission} $bottom={10} $right={5} $imgwidth={100} />
        </Btn>
        <Btn $width={165}>
          대출하기
          <Img src={loan} $bottom={-20} $imgwidth={120} />
        </Btn>
      </RowDiv>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px 0px 30px;
  height: ${screen.height < 700
    ? "123vh"
    : screen.height < 800
    ? "115vh"
    : "100vh"};
  /* height: 100vh; */
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover;
`;

const Btn = styled.div`
  position: relative;
  width: ${(props) => props.$width}px;
  height: 155px;
  border-radius: 15px;
  background: #fafafa;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 15px;

  font-size: 25px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${(props) => `calc(${window.innerWidth}px / 10.5)`};
  margin-top: ${(props) => (props.$isFirst ? "40px" : "20px")};
`;

const Img = styled.img`
  position: absolute;
  bottom: ${(props) => (props.$bottom ? `${props.$bottom}px` : "0")};
  right: ${(props) => (props.$right ? `${props.$right}px` : "0")};
  width: ${(props) => props.$imgwidth}px;
`;
