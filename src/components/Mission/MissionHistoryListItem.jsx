import React, { useEffect } from "react";
import tw from "twin.macro";
import { styled } from "styled-components";
import * as S from "../../styles/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { fetchMissionHistory } from "../../store/reducers/Mission/mission";
import { PuffLoader } from "react-spinners";

import MissionCard from "./MissionCard";

import EmptyImage from "~/assets/img/common/empty.svg";

const MissionHistoryListItem = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mission.historyData);
  const loading = useSelector((state) => state.mission.loading);
  const { year, month } = useSelector((state) => state.history);
  const { status } = useSelector((state) => state.history);

  const sn = useSelector((state) => state.user.userInfo.sn);

  useEffect(() => {
    const fetchHistory = async () => {
      let params = { year: year, month: month };
      if (status === 1) {
        params.status = 4;
      } else if (status === 2) {
        params.status = 5;
      }
      dispatch(fetchMissionHistory(params));
    };

    fetchHistory();
  }, [dispatch, year, month, status]);

  // TODO: status를 params로 받기 때문에 수정해야 함
  // const filterData = (data) => {
  //   if (status === 0) {
  //     return data;
  //   } else if (status === 1) {
  //     return data.filter((item) => item.status === 4);
  //   } else if (status === 2) {
  //     return data.filter((item) => item.status === 5);
  //   }
  //   return data;
  // };

  // const filteredData = filterData(data);

  return (
    <Container>
      <List>
        {loading ? (
          <LoadingState>
            <PuffLoader color="#4056c1" />
          </LoadingState>
        ) : (
          <>
            {data.length === 0 ? (
              <EmptyState>
                <Img src={EmptyImage} alt="No data" />
                <EmptyText>미션 내역이 없어요</EmptyText>
              </EmptyState>
            ) : (
              <S.CardContainer>
                {data.map((item) => (
                  <MissionCard key={item.id} status={item.status} mission={item.content} allowance={item.price} />
                ))}
              </S.CardContainer>
            )}
          </>
        )}
      </List>
    </Container>
  );
};

export default MissionHistoryListItem;

const Container = styled.div``;

const List = styled.ul`
  ${tw`list-none p-0`}
`;

const EmptyState = styled.div`
  ${tw`flex flex-col items-center justify-center h-full mt-20`}
`;

const Img = styled.img`
  ${tw`h-auto mb-4`}
  width: 40%
`;

const EmptyText = styled.div`
  ${tw`text-2xl`}
`;

const LoadingState = styled.div`
  ${tw`flex items-center justify-center h-full mt-20`}
`;
