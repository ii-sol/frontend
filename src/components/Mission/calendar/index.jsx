import { createContext } from "react";
import styled from "styled-components";

import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import useCalendar from "../hooks/useCalendar";
import SelectedDate from "./SelectedDate";

const CalendarContext = createContext();

function CalendarRoot({ children }) {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      <Container>{children}</Container>
    </CalendarContext.Provider>
  );
}

CalendarRoot.Header = CalendarHeader;
CalendarRoot.Body = CalendarBody;
CalendarRoot.Footer = SelectedDate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default CalendarRoot;
