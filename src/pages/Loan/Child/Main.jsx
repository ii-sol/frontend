import React from "react";
import tw from "twin.macro";
import messageIcon from "~/assets/img/child/message2.svg"; // 이미지 파일 경로를 확인하세요.
import loanIcon from "~/assets/img/child/loan.svg"; // 이미지 파일 경로를 확인하세요.

const Main = () => {
  return (
    <div tw="flex flex-col h-screen justify-between p-5">
      {/* Credit Score */}
      <div tw="flex flex-col items-center bg-blue-100 w-full rounded-2xl p-4 mb-4">
        <div tw="flex items-center">
          <p tw="text-lg">현재 나의 신뢰도는?</p>
        </div>
        <p tw="text-4xl font-bold mt-2">높음</p>
      </div>
      {/* Loan Request */}
      <div tw="flex items-center bg-gray-100 w-full rounded-2xl p-4 mb-4">
        <img src={messageIcon} alt="Message Icon" tw="mr-4" />
        <div>
          <p tw="text-lg">From. 아들</p>
          <p tw="text-lg font-bold">자전거 사기</p>
        </div>
        <div tw="ml-auto">
          <p tw="text-blue-500">D-3</p>
        </div>
      </div>
      {/* Loan History Header */}
      <div tw="flex justify-between items-center w-full mb-4">
        <p tw="text-lg font-bold">아들(정우성)의 대출</p>
        <button tw="text-blue-500">지난 내역</button>
      </div>
      {/* Loan History */}
      <div tw="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col">
          <div tw="flex items-center mb-2">
            <span tw="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">
              D-Day
            </span>
            <span tw="text-lg font-bold ml-auto">100,000원</span>
          </div>
          <p tw="text-sm text-gray-500">2024.05.12 ~ 2024.06.12</p>
          <p tw="text-sm text-gray-500">대출 총액 : 200,000원</p>
          <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-2" />
        </div>
        <div tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col">
          <div tw="flex items-center mb-2">
            <span tw="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">
              D-Day
            </span>
            <span tw="text-lg font-bold ml-auto">100,000원</span>
          </div>
          <p tw="text-sm text-gray-500">2024.05.12 ~ 2024.06.12</p>
          <p tw="text-sm text-gray-500">대출 총액 : 200,000원</p>
          <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-2" />
        </div>
        {/* Additional cards for demo */}
        <div tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col">
          <div tw="flex items-center mb-2">
            <span tw="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">
              D-Day
            </span>
            <span tw="text-lg font-bold ml-auto">100,000원</span>
          </div>
          <p tw="text-sm text-gray-500">2024.05.12 ~ 2024.06.12</p>
          <p tw="text-sm text-gray-500">대출 총액 : 200,000원</p>
          <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-2" />
        </div>
        <div tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col">
          <div tw="flex items-center mb-2">
            <span tw="bg-blue-100 text-blue-500 py-1 px-2 rounded-full">
              D-Day
            </span>
            <span tw="text-lg font-bold ml-auto">100,000원</span>
          </div>
          <p tw="text-sm text-gray-500">2024.05.12 ~ 2024.06.12</p>
          <p tw="text-sm text-gray-500">대출 총액 : 200,000원</p>
          <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Main;
