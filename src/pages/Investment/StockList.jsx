import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "../../components/Investment/Header";
import { styled } from "styled-components";
import search from "../../assets/img/Invest/search.svg";
import filledStar from "../../assets/img/Invest/filledStar.svg";
import blankStar from "../../assets/img/Invest/blankStar.svg";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import StocksDetail from "../../components/Investment/StocksDetail";
import { useDispatch } from "react-redux";
import { setCode } from "../../store/reducers/Invest/invest";

const StockList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleDismiss = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(1);
  const limit = 20;
  const [items, setItems] = useState([]);

  const searchResults = [
    {
      id: 0,
      name: "삼성전자",
      code: "005930",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 1,
      name: "LG",
      code: "003550",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 2,
      name: "SK하이닉스",
      code: "000660",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 3,
      name: "현대차",
      code: "005380",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 4,
      name: "NAVER",
      code: "035420",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 5,
      name: "카카오",
      code: "035720",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 6,
      name: "기아",
      code: "000270",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 7,
      name: "삼성바이오로직스",
      code: "207940",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 8,
      name: "삼성물산",
      code: "028260",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 9,
      name: "LG화학",
      code: "051910",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 10,
      name: "POSCO",
      code: "005490",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 11,
      name: "KT&G",
      code: "033780",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 12,
      name: "LG전자",
      code: "066570",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 13,
      name: "SK텔레콤",
      code: "017670",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 14,
      name: "신한지주",
      code: "055550",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 15,
      name: "KB금융",
      code: "105560",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 16,
      name: "하나금융지주",
      code: "086790",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 17,
      name: "삼성에스디에스",
      code: "018260",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 18,
      name: "LG유플러스",
      code: "032640",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 19,
      name: "KT",
      code: "030200",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 20,
      name: "현대모비스",
      code: "012330",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 21,
      name: "셀트리온",
      code: "068270",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 22,
      name: "삼성SDI",
      code: "006400",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 23,
      name: "한화솔루션",
      code: "009830",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 24,
      name: "HMM",
      code: "011200",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 25,
      name: "두산중공업",
      code: "034020",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 26,
      name: "한국전력",
      code: "015760",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 27,
      name: "CJ제일제당",
      code: "097950",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 28,
      name: "한국조선해양",
      code: "009540",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 29,
      name: "아모레퍼시픽",
      code: "090430",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 30,
      name: "삼성화재",
      code: "000810",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 31,
      name: "SK이노베이션",
      code: "096770",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 32,
      name: "LG디스플레이",
      code: "034220",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 33,
      name: "S-Oil",
      code: "010950",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 34,
      name: "한화",
      code: "000880",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 35,
      name: "KT&G",
      code: "033780",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 36,
      name: "롯데케미칼",
      code: "011170",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 37,
      name: "GS건설",
      code: "006360",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 38,
      name: "대우조선해양",
      code: "042660",
      market: "kospi",
      isAdded: true,
    },
    {
      id: 39,
      name: "한진칼",
      code: "180640",
      market: "kospi",
      isAdded: false,
    },
    {
      id: 40,
      name: "호텔신라",
      code: "008770",
      market: "kospi",
      isAdded: true,
    },
  ];

  const loadMore = useCallback(() => {
    const newItems = searchResults.slice((page - 1) * limit, page * limit);
    setItems((prevItems) => [...prevItems, ...newItems]);
  }, [page, limit, searchResults]);

  useEffect(() => {
    loadMore();
    console.log(page);
  }, [page]);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && items.length < searchResults.length) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [items.length, searchResults.length]
  );

  return (
    <S.Container>
      <Header />
      <S.CenterDiv>
        <SearchWrapper>
          <Img src={search} />
          <SearchInput />
        </SearchWrapper>
        <SearchResults>
          {items.map((result, index) => (
            <SearchResult
              ref={items.length === index + 1 ? lastItemRef : null}
              key={result.id}
              onClick={() => {
                setOpen(true);
                dispatch(setCode(result.code));
              }}
            >
              <StockDiv>
                <StockName>{result.name}</StockName>
                <RowDiv>
                  <StockCode>{result.code}</StockCode>
                  <StockIndex>
                    {result.market === "kospi" ? "코스피" : "코스닥"}
                  </StockIndex>
                </RowDiv>
              </StockDiv>
              <S.ColumnDiv>
                <PriceDiv>81400원</PriceDiv>
                <PriceDiv>▲100 +0.14%</PriceDiv>
              </S.ColumnDiv>
            </SearchResult>
          ))}
        </SearchResults>
        <BottomSheet open={open} onDismiss={handleDismiss}>
          <StocksDetail />
        </BottomSheet>
      </S.CenterDiv>
    </S.Container>
  );
};

export default StockList;

const SearchWrapper = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  height: 50px;
  background-color: #f3f3f3;
  /* border-radius: 50px; */
  margin-top: 10px;
`;

const Img = styled.img`
  position: absolute;
  top: 13px;
  left: 18px;
  font-size: 30px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding-left: 40px;
  font-size: 20px;
  border: none;
  background-color: #f3f3f3;
`;

const SearchResults = styled.ul`
  width: 100%;
  max-height: calc(100vh - 200px);
  height: calc(100vh - 200px);
  overflow: auto;
  padding-bottom: 5px;

  background-color: white;
  /* margin-top: 20px; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  text-align: left;
  min-height: 60px;

  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }

  &:nth-child(odd) {
    background-color: #f5faff;
  }
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const StockName = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #8c8c8c;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const PriceDiv = styled.div`
  text-align: right;
`;

const StockCode = styled.div`
  margin-right: 3px;
`;

const StockIndex = styled.div``;
