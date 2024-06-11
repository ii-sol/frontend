import React, { useState } from "react";
import tw from "twin.macro";
import Modal from "react-modal";
import messageIcon from "~/assets/img/child/null.svg"; // 이미지 파일 경로를 확인하세요.

const months = [
  "01월",
  "02월",
  "03월",
  "04월",
  "05월",
  "06월",
  "07월",
  "08월",
  "09월",
  "10월",
  "11월",
  "12월",
];

const LoanHistoryExist = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const [filter, setFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMonthClick = (selectedMonth) => {
    setMonth(selectedMonth);
    closeModal();
  };

  const handleYearChange = (change) => {
    setYear((prevYear) => prevYear + change);
  };

  return (
    <div tw="flex flex-col h-screen justify-between">
      <div tw="flex flex-col items-center p-5">
        <div tw="flex items-center mb-4 w-full max-w-lg bg-blue-100 rounded-2xl p-2">
          <button onClick={handlePrevMonth} tw="text-xl mx-2 text-right">
            {"<"}
          </button>
          <p
            tw="text-xl flex-grow text-center cursor-pointer"
            onClick={openModal}
          >
            {year}년 {months[month]}
          </p>
          <button onClick={handleNextMonth} tw="text-xl mx-2 text-left">
            {">"}
          </button>
        </div>
        <div tw="flex mb-4 w-full max-w-lg mb-8">
          <button
            onClick={() => handleFilterChange("전체")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "전체" && tw`bg-blue-700`]}
          >
            전체
          </button>
          <button
            onClick={() => handleFilterChange("완료")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "완료" && tw`bg-blue-700`]}
          >
            완료
          </button>
          <button
            onClick={() => handleFilterChange("거절")}
            tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mx-1 text-center"
            css={[filter === "거절" && tw`bg-blue-700`]}
          >
            거절
          </button>
        </div>
        <div tw="grid grid-cols-2 gap-4 w-full max-w-lg">
          <div tw="bg-white w-full h-52 rounded-2xl shadow-lg flex flex-col">
            <span tw="bg-blue-500 text-white py-1 px-2 rounded-full mb-2 ml-4 w-12 mt-5">
              완료
            </span>
            <span tw="text-lg font-bold ml-4 mt-1">100,000원</span>
            <span tw="text-xs text-gray-500 mt-2 ml-4">
              2024.05.12 ~ 2024.06.12
            </span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select Month and Year"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "auto",
            bottom: "0",
            left: "0",
            right: "0",
            height: "30%",
            borderRadius: "20px",
          },
        }}
      >
        <div tw="flex flex-col items-center p-4">
          <div tw="flex justify-between w-full mb-4">
            <button
              onClick={() => handleYearChange(-1)}
              tw="text-xl mx-2 text-right"
            >
              {"<"}
            </button>
            <p tw="text-xl">{year}년</p>
            <button
              onClick={() => handleYearChange(1)}
              tw="text-xl mx-2 text-left"
            >
              {">"}
            </button>
          </div>
          <div tw="grid grid-cols-4 gap-4">
            {months.map((m, i) => (
              <button
                key={i}
                onClick={() => handleMonthClick(i)}
                tw="text-lg py-2 px-4 rounded-2xl text-sm"
                css={[month === i && tw`bg-blue-300`]}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoanHistoryExist;
