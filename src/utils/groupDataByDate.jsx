export const groupDataByDate = (data) => {
  return data.reduce((acc, item) => {
    const date = item.createdDate.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
