import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import tw from "twin.macro";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import messageIcon from "~/assets/img/child/message3.svg";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import LoanCard from "../../../components/Loan/LoanCard";
import RequestCard from "../../../components/Loan/RequestCard.jsx";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:8082/child/loan");
        setLoans(response.data.response || []); // response.data.response 사용
      } catch (error) {
        console.error("Failed to fetch loans", error);
      }
    };

    fetchLoans();
  }, []);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  const handleCreateLoan = () => {
    navigate("/loan/who");
  };

  const handleHistory = () => {
    navigate("/loan/history-exist");
  };

  const handleProgress = (loanId) => {
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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div tw="flex flex-col h-screen">
        <header tw="flex justify-between p-4 bg-white">
          <button tw="text-2xl" onClick={handleBack}>
            <MdArrowBackIos />
          </button>
          <h1 tw="text-2xl font-bold">대출</h1>
          <div tw="w-8" /> {/* Placeholder for space balance */}
        </header>

        <main tw="flex flex-col flex-1 justify-start p-5 space-y-4">
          {/* Credit Score */}
          <div
            tw="flex flex-col items-center justify-center bg-blue-400 w-full rounded-2xl p-4 shadow-md"
            onClick={handleSelect}
          >
            {!isSelected ? (
              <>
                <div tw="flex items-center justify-center text-center">
                  <p tw="text-lg text-white font-bold">
                    현재 정우성의 신뢰도는?
                  </p>
                </div>
                <p tw="text-4xl font-bold mt-2 text-white text-center">
                  매우 높음
                </p>
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
          <div tw="w-full rounded-2xl p-2">
            <Slider {...sliderSettings}>
              {loans
                .filter((loan) => loan.status === 1)
                .map((loan) => (
                  <RequestCard
                    key={loan.id}
                    status={loan.status}
                    name={loan.parentName}
                    title={loan.title}
                    dday={calculateDday(loan.createDate)}
                    onClick={() => handleProgress(loan.id)}
                  />
                ))}
            </Slider>
          </div>
          {/* Loan History Header */}
          <div tw="flex justify-between items-center w-full">
            <p tw="text-lg font-bold">나의 대출</p>
            <button tw="text-blue-500" onClick={handleHistory}>
              지난 내역
            </button>
          </div>
          {/* Loan History */}
          <div tw="grid grid-cols-2 gap-5 w-full">
            <div
              tw="w-full rounded-2xl shadow-lg p-4 flex bg-blue-900 flex-col items-center justify-center min-h-[250px]"
              onClick={handleCreateLoan}
            >
              <p tw="font-bold text-2xl">대출</p>
              <p tw="font-bold text-2xl">신청하기</p>
            </div>

            {loans
              .filter((loan) => loan.status === 3)
              .map((loan) => (
                <LoanCard
                  key={loan.id}
                  amount={loan.amount}
                  period={`${formatDate(loan.createDate)} ~ ${formatDate(
                    loan.dueDate
                  )}`}
                  title={loan.title}
                  totalAmount={loan.balance}
                  minHeight="250px"
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
