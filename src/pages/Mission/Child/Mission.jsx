import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "../../../styles/GlobalStyles";
import { fetchOngoingMissions } from "../../../services/mission";
import { calculateDday } from "../../../utils/calculateDday";
import { useSelector } from "react-redux";

import Header from "~/components/common/Header";
import MissionCard from "../../../components/Mission/MissionCard";
import RequestCard from "../../../components/Mission/RequestCard";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const Mission = () => {
  const [ongoingMissions, setOngoingMissions] = useState([]);
  const navigate = useNavigate();

  const sn = useSelector((state) => state.user.userInfo.sn);

  useEffect(() => {
    const fetchOngoing = async () => {
      try {
        const data = await fetchOngoingMissions(sn);
        setOngoingMissions(data);
      } catch (error) {
        console.error("Error fetching regular allowance:", error);
      }
    };

    fetchOngoing();
  }, [sn]);

  const handleLeftClick = () => {
    navigate("/");
  };

  const handleReceiveRequestClick = () => {
    navigate("/mission/request/receive/detail");
  };

  const handleSendRequestClick = () => {
    navigate("/mission/request/send/detail");
  };

  const handleHistoryClick = () => {
    navigate("/mission/history");
  };

  const handleRequestClick = () => {
    navigate("/mission/create");
  };

  const handleMissionClick = (id) => {
    navigate(`/mission/${id}`);
  };

  return (
    <div>
      <S.Container>
        <Header left={"<"} onLeftClick={handleLeftClick} title={"미션"} />
        {/* TODO: dday = due_date - craete_date */}
        <Wrapper>
          <Slider {...sliderSettings}>
            {/* {requests
                .filter((request) => request.status === 1)
                .map((request) => (
                  <RequestCard
                    key={request.id}
                    status={request.status}
                    name={request.parentName}
                    title={request.title}
                    dday={calculateDday(request.createDate)}
                    onClick={() => handleRequestProgress(request.id)}
                  />
                ))} */}
            <RequestCard status="send" name="엄마" content="심부름 다녀오기" dday="3" onClick={handleSendRequestClick} />
            <RequestCard status="receive" name="엄마" content="심부름 다녀오기" dday="0" onClick={handleReceiveRequestClick} />
            <RequestCard status="send" name="엄마" content="심부름 다녀오기" dday="3" onClick={handleSendRequestClick} />
          </Slider>
        </Wrapper>

        <Menu>
          <S.Phrase>진행 중</S.Phrase>
          <S.HistoryLink onClick={handleHistoryClick}>지난 미션 &gt;</S.HistoryLink>
        </Menu>
        <S.CardContainer>
          <RegisterButton onClick={handleRequestClick}>
            <span tw="text-[#346BAC]">미션</span>요청하기
          </RegisterButton>
          {ongoingMissions.map((mission) => (
            <MissionCard key={mission.id} id={mission.id} onClick={() => handleMissionClick(mission.id)} dday={calculateDday(mission.createDate)} mission={mission.content} allowance={mission.price} />
          ))}
          <MissionCard onClick={handleMissionClick} dday="3" mission="설거지하기" allowance="10000" />
        </S.CardContainer>
      </S.Container>
    </div>
  );
};

export default Mission;

const RegisterButton = styled.button`
  ${tw`
  flex
  flex-col
  justify-center
  items-center
  p-5
  `}
  width: 148px;
  height: 232px;
  border-radius: 20px;
  background-color: rgba(151, 178, 221, 0.4);
  box-shadow: 0px 0px 15px 0px rgba(151, 178, 221, 0.4);
  font-size: 20px;
  font-weight: 700;
`;

const Menu = styled.div`
  ${tw`
  grid
  mb-2
  items-center
  `}
  grid-template-columns: auto auto;
`;

const Wrapper = styled.div`
  ${tw`w-full rounded-2xl`}
  .slick-prev:before,
  .slick-next:before {
    font-family: "slick";
    font-size: 20px;
    line-height: 1;

    opacity: 0.75;
    color: #97b2dd;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.2;
  }
`;
