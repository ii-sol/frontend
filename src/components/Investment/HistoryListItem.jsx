import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HistoryListItem = () => {
  const navigate = useNavigate();
  const status = useSelector((state) => state.history.status);
  const [data, setData] = useState([]);

  useEffect(() => {
    let updatedData;
    if (status === 0) {
      updatedData = [
        {
          proposeId: 0,
          type: 1,
          status: 0,
          name: "삼성전자",
          code: "005930",
          quantity: 3,
          trading: 1,
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
        },
        {
          proposeId: 1,
          type: 1,
          status: 1,
          name: "SK하이닉스",
          code: "005930",
          quantity: 5,
          trading: 1,
          message: "투자 제안 메세지",
          who: "아빠",
        },
        {
          proposeId: 2,
          type: 0,
          status: 3,
          name: "SK하이닉스",
          code: "005930",
          message: "종목 제안 메세지",
          who: "아빠",
          direction: 1,
        },
        {
          proposeId: 3,
          type: 0,
          status: 2,
          name: "삼성물산",
          code: "005930",
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
        },
        {
          proposeId: 4,
          type: 0,
          status: 3,
          name: "삼성물산",
          code: "005930",
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
          direction: 0,
        },
      ];
    } else if (status === 1) {
      updatedData = [
        {
          proposeId: 0,
          type: 1,
          status: 0,
          name: "삼성전자",
          code: "005930",
          quantity: 3,
          trading: 1,
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
        },
        {
          proposeId: 1,
          type: 1,
          status: 1,
          name: "SK하이닉스",
          code: "005930",
          quantity: 5,
          trading: 1,
          message: "투자 제안 메세지",
          who: "아빠",
        },
      ];
    } else {
      updatedData = [
        {
          proposeId: 2,
          type: 0,
          status: 3,
          name: "SK하이닉스",
          code: "005930",
          message: "종목 제안 메세지",
          who: "아빠",
          direction: 1,
        },
        {
          proposeId: 3,
          type: 0,
          status: 2,
          name: "삼성물산",
          code: "005930",
          message: "종목 제안 메세지",
          who: "엄마",
          direction: 0,
        },
        {
          proposeId: 4,
          type: 0,
          status: 3,
          name: "삼성물산",
          code: "005930",
          message:
            "메세지 안녕하세요. 아버님 제가 이번에 기가 막힌 종목을 찾아왔는데 이 주식이야 말로 저희 집을 바로 세울 기업입니다. 이 기업 앞으로 어쩌고",
          who: "엄마",
          direction: 0,
        },
      ];
    }
    setData(updatedData);
  }, [status]);

  const renderBadge = (status) => {
    switch (status) {
      case 0:
        return (
          <S.Badge $back="#D5E0F1" $font="#346BAC">
            수락
          </S.Badge>
        );
      case 1:
        return (
          <S.Badge $back="#FFDCDC" $font="#CC3535">
            거절
          </S.Badge>
        );
      case 2:
        return (
          <S.Badge $back="#FFE196" $font="#FF7A00">
            대기
          </S.Badge>
        );
      default:
        return <div style={{ height: "30px" }}></div>;
    }
  };

  const renderType = (type) => {
    return (
      <Type>
        {type === 0 ? "종목" : "투자"}
        <br />
        제안
      </Type>
    );
  };

  return (
    <Container>
      {data?.map((d) => (
        <Wrapper
          key={d.proposeId}
          onClick={() => navigate(`/invest/history/${d.proposeId}`)}
        >
          {renderBadge(d.status)}
          {renderType(d.type)}
          <Who>
            {d.direction === 1 ? "From." : "To."} {d.who}
          </Who>
          <Content>{d.message}</Content>
          <DetailDiv>
            <Div $font="#154B9B">종목 : {d.name}</Div>
            {d.type === 1 ? (
              <Div $font="#FF7A00">수량 : {d.quantity}주</Div>
            ) : null}
          </DetailDiv>
        </Wrapper>
      ))}
    </Container>
  );
};

export default HistoryListItem;

const Container = styled.div``;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 170px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #f4f9ff;
  border-radius: 15px;
  padding: 15px;

  margin-bottom: 20px;
`;

const Type = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 58px;
  color: #346bac;
  font-size: 20px;
  font-weight: 700;
  background-color: white;
`;

const Who = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

const Content = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DetailDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
`;

const Div = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;
  color: ${(props) => props.$font};
`;
