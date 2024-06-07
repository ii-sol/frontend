import React from "react";
import tw from "twin.macro";
import piggyBank from "~/assets/img/child/piggyBank.svg"; // 이미지 파일 경로를 확인하세요.

const Money = () => {
  return (
    <div tw="flex flex-col justify-between">
      <main tw="flex flex-col items-center flex-grow justify-center">
        <p tw="text-2xl text-center mt-4">얼마를 빌릴까요?</p>
        <img src={piggyBank} alt="Piggy Bank" tw="w-52 h-52" />
        <p tw="text-xl bg-gray-200 w-36 h-10 rounded-2xl p-1">1,000 원</p>
        <div tw="grid grid-cols-3 gap-4 mt-8 w-full max-w-xs mx-auto bg-blue-100 rounded-2xl">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "←"].map(
            (value) => (
              <button
                key={value}
                tw="text-2xl p-4 hover:bg-blue-200 rounded-2xl"
              >
                {value}
              </button>
            )
          )}
        </div>
      </main>
      <footer tw="fixed bottom-0 left-0 right-0 w-full p-4">
        <button tw="w-full bg-blue-300 p-4 text-white rounded-xl hover:bg-blue-400">
          다음
        </button>
      </footer>
    </div>
  );
};

export default Money;
