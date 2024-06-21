import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import tw from "twin.macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import LoanCard from "../../../components/Loan/LoanCard";
import RequestCard from "../../../components/Loan/RequestCard.jsx";
import Header from "../../../components/common/Header.jsx";
import { styled } from "styled-components";
import { BASE_URL, baseInstance } from "../../../services/api.jsx";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const baseUrl = "/loan";

    const fetchLoans = async () => {
      try {
        const response = await baseInstance.get(baseUrl);
        setLoans(response.data.response || []); // response.data.response 사용
      } catch (error) {
        console.error("Failed to fetch loans", error);
      }
    };

    fetchLoans();
  }, []);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  const handleCreateLoan = () => {
    navigate("/loan/who");
  };

  const handleHistory = () => {
    navigate("/loan/history");
  };

  const handleProgress = (loanId) => {
    navigate(`/loan/detailOnGoing/${loanId}`);
  };

  const handleRequestProgress = (loanId) => {
    navigate(`/loan/detail/${loanId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
      .replace(/\s/g, ".");
  };

  const calculateDday = (createDate) => {
    const now = new Date();
    const created = new Date(createDate);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return 3 - diffDays;
  };

  const handleLeftClick = () => {
    navigate("/");
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div tw="flex flex-col h-screen">
        <Header left={<MdArrowBackIos />} title={"빌리기"} onLeftClick={handleLeftClick} />

        <main tw="flex flex-col flex-1 justify-start space-y-4 mt-1">
          {/* Credit Score */}
          <div tw="flex flex-col items-center justify-center bg-blue-400 w-full rounded-2xl p-4 shadow-md" onClick={handleSelect}>
            {!isSelected ? (
              <>
                <div tw="flex items-center justify-center text-center">
                  <p tw="text-lg text-white font-bold">현재 정우성의 신뢰도는?</p>
                </div>
                <p tw="text-4xl font-bold mt-2 text-white text-center">매우 높음</p>
              </>
            ) : (
              <>
                <div tw="flex items-center justify-center text-center">
                  <p tw="text-lg text-white font-bold">현재 정우성의 금리는?</p>
                </div>
                <p tw="text-4xl font-bold mt-2 text-white text-center">4.5%</p>
              </>
            )}
          </div>
          <Container tw="w-full rounded-2xl p-2">
            <Slider {...sliderSettings}>
              {loans
                .filter((loan) => loan.status === 1)
                .map((loan) => (
                  <RequestCard key={loan.id} status={loan.status} name={loan.parentName} title={loan.title} dday={calculateDday(loan.createDate)} onClick={() => handleRequestProgress(loan.id)} />
                ))}
            </Slider>
          </Container>
          {/* Loan History Header */}
          <div tw="flex justify-between items-center w-full">
            <p tw="text-lg font-bold">나의 빌린 돈</p>
            <button tw="" onClick={handleHistory}>
              지난 기록 &gt;
            </button>
          </div>
          {/* Loan History */}
          <div tw="grid grid-cols-2 gap-5 w-full">
            <Card onClick={handleCreateLoan}>
              <p tw="font-bold text-2xl">빌리기</p>
              <p tw="font-bold text-2xl">부탁하기</p>
            </Card>

            {loans
              .filter((loan) => loan.status === 3)
              .map((loan) => (
                <LoanCard
                  key={loan.id}
                  amount={loan.amount}
                  period={`${formatDate(loan.createDate)} ~ ${formatDate(loan.dueDate)}`}
                  title={loan.title}
                  totalAmount={loan.balance}
                  onClick={() => handleProgress(loan.id)}
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;

const Container = styled.div`
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 20px;
    line-height: 1;

    opacity: 0.75;
    color: #97b2dd;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.2;
  }
`;

const Card = styled.div`
  ${tw`
  w-full
  rounded-2xl
  p-4
  flex
  flex-col
  items-center
  justify-center
  `}
  height:232px;
  background: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
`;
