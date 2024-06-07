import React from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";

const InsideLayout = () => {
  return (
    <div tw="flex flex-col h-screen">
      <header tw="mt-5 flex justify-between items-center p-6">
        <button tw="text-xl">{"<"}</button>
        <h1 tw="text-2xl font-bold">대출</h1>
        <button tw="text-xl">취소</button>
      </header>
      <main tw="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InsideLayout;
