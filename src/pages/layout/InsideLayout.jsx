import React from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";

const InsideLayout = () => {
  return (
    <div tw="flex flex-col h-screen">
      <header tw="flex justify-between items-center p-4">
        <button tw="text-lg">{"<"}</button>
        <h1 tw="text-lg font-bold">대출</h1>
        <button tw="text-lg">취소</button>
      </header>
      <main tw="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InsideLayout;
