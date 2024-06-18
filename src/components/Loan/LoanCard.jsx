import React from "react";
import tw from "twin.macro";
import loanIcon from "~/assets/img/child/loan.svg";

const LoanCard = ({
  amount,
  period,
  totalAmount,
  title,
  minHeight,
  onClick,
}) => {
  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div onClick={onClick}>
      <div
        tw="bg-white w-full rounded-2xl shadow-lg p-4 flex flex-col cursor-pointer"
        css={{ minHeight }}
      >
        <div tw="flex items-center mb-2">
          <span tw="bg-blue-100 text-blue-500 py-1 px-2 mt-1 text-sm rounded-full">
            {title}
          </span>
        </div>
        <span tw="text-lg font-bold mt-1">{formatAmount(amount)}원</span>
        <p tw="text-xs text-gray-500 mt-2">{period}</p>
        <p tw="text-sm text-gray-500 mt-1">
          빌린 금액 : {formatAmount(totalAmount)}원
        </p>
        <img src={loanIcon} alt="Loan Icon" tw="ml-auto mt-6 w-20 h-20" />
      </div>
    </div>
  );
};

export default LoanCard;
