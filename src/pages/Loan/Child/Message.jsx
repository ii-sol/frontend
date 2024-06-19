import React, { useState, useEffect, useRef } from "react";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import message from "~/assets/img/Loan/message.svg";
import NextButton from "../../../components/Loan/NextButton";
import { useDispatch } from "react-redux";
import { setLoanDetails } from "../../../store/action";
import Header from "../../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";

import MessageImage from "~/assets/img/common/heartLay.svg";

const Message = () => {
  const [messageText, setMessageText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [error, setError] = useState("");
  const messageRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [messageText, titleText]);

  const handleChange = (e) => {
    if (e.target.value.length <= 50) {
      setMessageText(e.target.value);
      setError("");
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 10) {
      setTitleText(e.target.value);
      setError("");
    }
  };

  const handleNext = () => {
    if (messageText.length > 0 && titleText.length > 0) {
      dispatch(setLoanDetails({ message: messageText, title: titleText }));
      navigate("/loan/complete");
    } else {
      setError("제목과 메세지를 1자 이상 입력해주세요.");
    }
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 빌리기"}
        onLeftClick={() => {
          navigate("/loan/main");
        }}
      />

      <div tw="flex flex-col justify-between">
        <div tw="flex flex-col items-center p-5 mt-10">
          <img src={MessageImage} tw=" w-[143px] h-auto my-16" alt="Message" />
          <div tw="w-full max-w-md">
            <div tw="bg-blue-100 p-6 rounded-2xl mb-4">
              <div tw="bg-white p-3 rounded-2xl mb-4">
                <textarea
                  ref={titleRef}
                  value={titleText}
                  onChange={handleTitleChange}
                  rows={1}
                  tw="resize-none w-full outline-none border-none text-center text-lg overflow-hidden"
                  placeholder="제목을 입력하세요."
                />
              </div>
              <div tw="bg-white p-3 rounded-2xl">
                <textarea
                  ref={messageRef}
                  value={messageText}
                  onChange={handleChange}
                  rows={1}
                  tw="resize-none w-full outline-none border-none text-center text-lg overflow-hidden"
                  placeholder="메세지를 입력하세요"
                />
              </div>
            </div>
            <p tw="text-gray-500 text-center">{messageText.length}/50</p>
            {error && <p tw="text-red-500 text-center mt-2">{error}</p>}
          </div>
        </div>
        <footer tw="p-4">
          <NextButton onClick={handleNext} />
        </footer>
      </div>
    </>
  );
};

export default Message;
