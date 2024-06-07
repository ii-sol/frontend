import React from "react";
import tw from "twin.macro";

const FromWho = () => {
  return (
    <>
      <div tw="p-5">
        <p tw="text-xl text-center"> 누구에게 돈을 빌릴까요?</p>
      </div>

      <div tw="flex justify-center w-full h-20 bg-gray-100">
        <p tw="inline-block align-middle text-center">엄마</p>
      </div>
    </>
  );
};

export default FromWho;
