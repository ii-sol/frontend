import React from "react";
import "./index.css";

const MainInnerLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <button className="text-lg">{"<"}</button>
        <h1 className="text-lg font-bold">대출</h1>
        <button className="text-lg">취소</button>
      </header>
      <main className="flex-1 p-4">{/* 추가적인 콘텐츠는 여기다 작성 */}</main>
    </div>
  );
};

export default MainInnerLayout;
