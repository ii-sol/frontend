import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";

const LoanDetail = () => {
  const navigate = useNavigate();

  const loanAmount = 200000;
  const loanPeriod = 2; // in months
  const interestRate = 4.5 / 100; // annual interest rate
  const applicationDate = "2024-06-03";
  const maturityDate = "2024-11-03";

  const calculateInterest = (amount, rate, period) => {
    return Math.round(amount * (rate / 12) * period);
  };

  const calculateRepaymentPlan = (amount, rate, period) => {
    const monthlyInterestRate = rate / 12;
    const repaymentPlan = [];
    const monthlyPrincipal = Math.round(amount / period);

    for (let i = 1; i <= period; i++) {
      const remainingPrincipal = amount - monthlyPrincipal * (i - 1);
      const interest = Math.round(remainingPrincipal * monthlyInterestRate);
      const totalRepayment = monthlyPrincipal + interest;

      repaymentPlan.push({
        installment: i,
        principal: monthlyPrincipal,
        interest: interest,
        totalRepayment: totalRepayment,
        remainingPrincipal: amount - monthlyPrincipal * i,
      });
    }

    return repaymentPlan;
  };

  const [totalInterest, setTotalInterest] = useState(0);
  const [repaymentPlan, setRepaymentPlan] = useState([]);

  useEffect(() => {
    const interest = calculateInterest(loanAmount, interestRate, loanPeriod);
    setTotalInterest(interest);

    const plan = calculateRepaymentPlan(loanAmount, interestRate, loanPeriod);
    setRepaymentPlan(plan);
  }, []);

  const handleRepaymentCompletion = () => {
    // Handle the repayment completion logic here
  };

  return (
    <div tw="flex flex-col h-screen p-4">
      <main tw="flex flex-col items-center bg-white rounded-2xl p-4 mt-4">
        <p tw="text-lg">D-48</p>
        <p tw="text-3xl font-bold mt-2">200,000원</p>

        <div tw="bg-blue-100 rounded-2xl p-4 mt-6 w-full max-w-md shadow-lg">
          <p tw="text-left font-bold">To. 엄마</p>
          <p tw="mt-2">자전거가 너무 사고 싶어서</p>
          <p tw="mt-1">매일 꿈에 나와요 ㅜ.ㅜ</p>
        </div>

        <section tw="mt-6 w-full max-w-md ">
          <h3 tw="text-lg font-bold ml-2">대출 상세 정보</h3>
          <div tw="bg-blue-100 rounded-2xl p-4 mt-2 shadow-lg">
            <p tw="flex justify-between">
              <span>대출 금액</span>
              <span>200,000원</span>
            </p>
            <p tw="flex justify-between mt-2">
              <span>대출 기간</span>
              <span>2개월</span>
            </p>
            <p tw="flex justify-between mt-2">
              <span>총 대출 이자</span>
              <span>{totalInterest}원</span>
            </p>
            <p tw="flex justify-between mt-2">
              <span>대출 금리</span>
              <span>4.5%</span>
            </p>
            <p tw="flex justify-between mt-2">
              <span>신청일</span>
              <span>{applicationDate}</span>
            </p>
            <p tw="flex justify-between mt-2">
              <span>만기일</span>
              <span>{maturityDate}</span>
            </p>
          </div>
        </section>

        <section tw="mt-6 w-full max-w-md">
          <h3 tw="text-lg font-bold ml-2">상환 계획</h3>
          <div tw="border-2">
            <table tw="w-full mt-2">
              <thead>
                <tr>
                  <th tw="border-b-2 border-gray-300 p-2 text-sm">회차</th>
                  <th tw="border-b-2 border-gray-300 p-2 text-sm">납입원금</th>
                  <th tw="border-b-2 border-gray-300 p-2 text-sm">대출이자</th>
                  <th tw="border-b-2 border-gray-300 p-2 text-sm">월상환금</th>
                  <th tw="border-b-2 border-gray-300 p-2 text-sm">대출잔금</th>
                </tr>
              </thead>
              <tbody>
                {repaymentPlan.map((item) => (
                  <tr key={item.installment}>
                    <td tw="border-b border-gray-300 p-2">{item.installment}</td>
                    <td tw="border-b border-gray-300 p-2">{item.principal}</td>
                    <td tw="border-b border-gray-300 p-2">{item.interest}</td>
                    <td tw="border-b border-gray-300 p-2 ">{item.totalRepayment}</td>
                    <td tw="border-b border-gray-300 p-2">{item.remainingPrincipal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <button tw="bg-blue-500 text-white py-2 px-4 rounded-2xl mt-6">상환 완료</button>

      </main>
    </div>
  );
};

export default LoanDetail;
