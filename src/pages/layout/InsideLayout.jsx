import React from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import { MdArrowBackIos } from "react-icons/md";

const InsideLayout = ({ service }) => {
  return (
    <div tw="flex flex-col h-screen">
      <header tw="flex justify-between items-center p-4">
        <button tw="text-2xl">
          <MdArrowBackIos />
        </button>
        <h1 tw="text-2xl font-bold">{service}</h1>
        <button tw="text-lg">취소</button>
      </header>
      <main tw="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InsideLayout;
