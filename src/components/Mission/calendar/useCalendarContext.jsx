import { createContext, useContext } from "react";

export const CalendarContext = createContext(null);

export default function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within CalendarProvider");
  }
  return context;
}
