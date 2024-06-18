import React from "react";
import * as S from "../../styles/GlobalStyles";
import Header from "~/components/common/Header";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import Filter from "../../components/Notification/Filter";
import NotiList from "../../components/Notification/NotiList";

const Notification = () => {
  const navigate = useNavigate();
  const handleLeftClick = () => {
    navigate("/");
  };
  return (
    <S.Container>
      <Header
        left={<MdArrowBackIos />}
        onLeftClick={handleLeftClick}
        title={"알림"}
        right={""}
      />
      <Filter />
      <NotiList />
    </S.Container>
  );
};

export default Notification;
