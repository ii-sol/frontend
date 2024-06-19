import React, { useEffect, useState } from "react";
import * as S from "../../styles/GlobalStyles";
import tw from "twin.macro";
import { styled } from "styled-components";
import Item from "./Item";
import { fetchNoti } from "../../services/notifications";
import { groupDataByDate } from "../../utils/groupDataByDate";
import EmptyImage from "~/assets/img/common/empty.svg";
import { useSelector } from "react-redux";

const NotiList = () => {
  const [noti, setNoti] = useState([]);
  const functionCode = useSelector((state) => state.noti.functionCode);
  const fetchNotificatiton = async () => {
    try {
      const data = await fetchNoti(1);
      setNoti(data.response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotificatiton();
  }, []);

  const groupedData = groupDataByDate(noti);

  const filterGroupedDataByFunctionCode = (data, code) => {
    const filteredData = {};
    if (code === 0) {
      return data;
    }
    Object.keys(data).forEach((date) => {
      const filteredByFunctionCode = data[date].filter((item) => {
        if (code === 7) {
          return item.functionCode === 1 || item.functionCode === 2;
        } else {
          return item.functionCode === code;
        }
      });

      if (filteredByFunctionCode.length > 0) {
        filteredData[date] = filteredByFunctionCode;
      }
    });
    return filteredData;
  };

  const filteredData = filterGroupedDataByFunctionCode(
    groupedData,
    functionCode
  );

  const sortedDates = Object.keys(filteredData).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <S.Container>
      {sortedDates.length === 0 ? (
        <EmptyState>
          <Img src={EmptyImage} alt="No data" />
          <EmptyText>알림이 없어요</EmptyText>
        </EmptyState>
      ) : (
        sortedDates.map((date, index) => (
          <DateGroup key={index}>
            <DateArea>{date}</DateArea>
            <Hr />
            {filteredData[date].map((d, index) => (
              <Item key={index} data={d} />
            ))}
          </DateGroup>
        ))
      )}
    </S.Container>
  );
};

export default NotiList;

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

const Date = styled.div`
  color: #949494;
  margin-top: 30px;
`;

const DateGroup = styled.div`
  ${tw`mb-9`}
`;

const DateArea = styled.div`
  ${tw`font-medium mb-2 text-[#949494]`}
  font-size: 12px;
`;

const Hr = styled.hr`
  ${tw`mb-2`}
`;
