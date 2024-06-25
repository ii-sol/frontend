// export const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" };
//   return new Intl.DateTimeFormat("ko-KR", options).format(date);
// };

export const formatDate = (timestamp) => {
  if (!timestamp) {
    console.error("Invalid timestamp:", timestamp);
    return "Invalid date";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object:", date);
    return "Invalid date";
  }

  const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};
