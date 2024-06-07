import React from "react";
import tw from "twin.macro";
// import momIcon from "~/assets/img/child/MomIcon.svg"; // 올바른 경로

const FromWho = () => {
  return (
    <>
      <div tw="p-5">
        <p tw="text-2xl text-center mt-4"> 누구에게 돈을 빌릴까요?</p>
      </div>

      <div tw="flex flex-row w-10/12 h-20 bg-blue-100 m-6 ml-9 rounded-2xl">
        <img
          src={momIcon}
          alt="Mom Icon"
          tw="h-16 w-16 rounded-l-2xl ml-6 mt-2"
        />
        <p tw="text-xl ml-6 mt-6">엄마</p>
      </div>

      <div tw="flex flex-row w-10/12 h-20 bg-blue-100 m-6 ml-9 rounded-2xl">
        <img
          src={momIcon}
          alt="Mom Icon"
          tw="h-16 w-16 rounded-l-2xl ml-6 mt-2"
        />
        <p tw="text-xl ml-6 mt-6">아빠</p>
      </div>

      <div tw="fixed bottom-10 left-7 right-7 bg-blue-200 p-3 text-center rounded-2xl hover:bg-blue-300">
        <p tw="text-xl">다음</p>
      </div>
    </>
  );
};

export default FromWho;
