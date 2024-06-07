import React from "react";
import tw from "twin.macro";
import message from "~/assets/img/child/message.svg";

const Message = () => {
  return (
    <div tw="flex flex-col h-screen justify-between">
      <div tw="flex flex-col items-center p-5">
        <img src={message} tw="mb-4" alt="Message" />
        <div tw="flex justify-center items-center bg-blue-100 p-6 rounded-2xl">
          <div tw="flex justify-center items-center bg-white px-4 py-6 rounded-2xl">
            <p tw="text-gray-500 text-center">메세지를 입력하세요... 0/50</p>
          </div>
        </div>
      </div>

      <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
        <button tw="w-full bg-blue-300 p-3 text-white rounded-xl hover:bg-blue-400 font-bold text-xl">
          다음
        </button>
      </footer>
    </div>
  );
};

export default Message;
