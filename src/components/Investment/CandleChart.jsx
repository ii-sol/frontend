import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";

const CandleChart = () => {
  const [selected, setSelected] = useState("1년차트");
  const handleClick = (chartType) => {
    setSelected(chartType);
  };

  const data = [
    {
      time_close: "2023-01-01T00:00:00Z",
      open: 1500,
      high: 1550,
      low: 1480,
      close: 1520,
    },
    {
      time_close: "2023-02-01T00:00:00Z",
      open: 1520,
      high: 1580,
      low: 1510,
      close: 1570,
    },
    {
      time_close: "2023-03-01T00:00:00Z",
      open: 1570,
      high: 1600,
      low: 1500,
      close: 1510,
    },
    {
      time_close: "2023-04-01T00:00:00Z",
      open: 1590,
      high: 1620,
      low: 1580,
      close: 1610,
    },
  ];

  const [chartOptions, setChartOptions] = useState({
    theme: {
      mode: "dark",
    },
    chart: {
      type: "candlestick",
      height: 350,
      width: 500,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      categories: data.map((price) => price.time_close),
      labels: {
        style: {
          colors: "#9c88ff",
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3C90EB",
          downward: "#DF7D46",
        },
      },
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: data.map((price) => {
        return {
          x: new Date(price.time_close),
          y: [price.open, price.high, price.low, price.close],
        };
      }),
    },
  ]);

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: data.map((price) => price.time_close),
      },
    }));
    setChartSeries([
      {
        data: data.map((price) => ({
          x: new Date(price.time_close),
          y: [price.open, price.high, price.low, price.close],
        })),
      },
    ]);
  }, [selected]);

  return (
    <div>
      <S.RowDiv style={{ justifyContent: "start", margin: "20px 0px" }}>
        <ToggleBtn
          $selected={selected === "1년차트"}
          onClick={() => handleClick("1년차트")}
        >
          1년차트
        </ToggleBtn>
        <ToggleBtn
          $selected={selected === "한달차트"}
          onClick={() => handleClick("한달차트")}
        >
          한달차트
        </ToggleBtn>
      </S.RowDiv>
      <S.CenterDiv>
        <ReactApexChart
          type="candlestick"
          series={chartSeries}
          options={chartOptions}
          height={350}
          width={320}
        />
      </S.CenterDiv>
    </div>
  );
};

export default CandleChart;

const ToggleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 30px;
  border-radius: 5px;
  background: ${(props) => (props.$selected ? "#154B9B" : "#ffffff")};
  color: ${(props) => (props.$selected ? "white" : "#949494")};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background: ${(props) => (props.$selected ? "#154B9B" : "#ffffff")};
  }
  margin-right: 15px;
  font-size: 15px;
`;
