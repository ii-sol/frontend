import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import message from "~/assets/img/child/message.svg";
import NextButton from "../../../components/Loan/NextButton";

const Message = () => {
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Adjust the height of the textarea to fit the content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [messageText]);

  const handleChange = (e) => {
    if (e.target.value.length <= 50) {
      setMessageText(e.target.value);
      setError("");
    }
  };

  const handleNext = () => {
    if (messageText.length > 0) {
      navigate("/loan/complete");
    } else {
      setError("메세지를 1자 이상 입력해주세요.");
    }
  };

  return (
    <div tw="flex flex-col h-screen justify-between">
      <div tw="flex flex-col items-center p-5">
        <img src={message} tw="mb-4" alt="Message" />
        <div tw="flex justify-center items-center bg-blue-100 p-6 rounded-2xl w-full">
          <div tw="flex justify-center items-center bg-white px-4 py-4 rounded-2xl w-full">
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={handleChange}
              rows={1} // Initial rows to keep it small
              tw="resize-none w-full outline-none border-none text-center text-lg overflow-hidden"
              placeholder="메세지를 입력하세요..."
            />
          </div>
        </div>
        <p tw="text-gray-500 mt-2">{messageText.length}/50</p>
        {error && <p tw="text-red-500 mt-2">{error}</p>}
      </div>

      <footer tw="fixed bottom-2 left-0 right-0 w-full p-4">
        <NextButton onClick={handleNext} />
      </footer>
    </div>
  );
};

export default Message;
