export const groupDataByDate = (data) => {
  return data.reduce((acc, item) => {
    let date;
    {
      item.createDate
        ? (date = item.createDate.split("T")[0])
        : (date = item.createdDate.split("T")[0]);
    }

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
