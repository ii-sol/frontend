import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import moneyHand from "~/assets/img/Account/moneyhand.svg";
import Header from "../../components/common/Header";
import { MdArrowBackIos } from "react-icons/md";
import NextButton from "../../components/Loan/NextButton";

const SelectAccount = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const complete = () => {
    if (/^\d{11}$/.test(phoneNumber)) {
      if (selectedAccount) {
        navigate("/account/money");
      } else {
        setErrorMessage("계좌번호를 선택해주세요.");
      }
    } else {
      setErrorMessage("올바른 계좌번호 형식이 아닙니다");
    }
  };

  return (
    <>
      <Header
        left={<MdArrowBackIos />}
        title={"돈 보내기"}
        onLeftClick={() => {
          navigate("/");
        }}
      />
      <div tw="flex flex-col items-center h-screen">
        <div tw="flex flex-col items-center mt-4">
          <h2 tw="text-2xl font-semibold">누구에게 보낼래요?</h2>
          <img src={moneyHand} alt="Money Hand" tw="w-72 h-52 mt-4" />
        </div>

        <div tw="flex flex-col items-center w-full mt-6">
          <div tw="w-full p-3 rounded-2xl border border-blue-300 bg-blue-100 text-xl">
            <label htmlFor="phoneNumber" tw="p-4">
              전화번호
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              tw="w-11/12 mt-2 ml-2 p-2 border-none text-xl rounded bg-blue-100"
              placeholder="01012341234"
            />
          </div>

          {errorMessage && <p tw="text-red-500 text-sm mt-2">{errorMessage}</p>}

          <div tw="flex justify-around w-full mt-4">
            <button
              tw="flex-1 mx-2 p-3 rounded-2xl text-xl text-center"
              css={[
                selectedAccount === "용돈 계좌"
                  ? tw`bg-blue-200`
                  : tw`bg-blue-100`,
              ]}
              onClick={() => handleAccountSelect("용돈 계좌")}
            >
              01 <p>용돈 계좌</p>
            </button>
            <button
              tw="flex-1 mx-2 p-3 rounded-2xl text-xl text-center"
              css={[
                selectedAccount === "증권 계좌"
                  ? tw`bg-blue-200`
                  : tw`bg-blue-100`,
              ]}
              onClick={() => handleAccountSelect("증권 계좌")}
            >
              02 <p>증권 계좌</p>
            </button>
          </div>
        </div>

        <button
          tw="fixed bottom-10 left-7 right-7 bg-blue-200 p-3 text-center rounded-2xl hover:bg-blue-300 cursor-pointer"
          onClick={complete}
        >
          완료
        </button>
      </div>
    </>
  );
};

export default SelectAccount;
