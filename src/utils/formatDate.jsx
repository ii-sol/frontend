export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};
