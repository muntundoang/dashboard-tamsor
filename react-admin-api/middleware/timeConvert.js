const syncDate = (date) => {
  let createdAt = date.toLocaleString({
    timeZone: "Asia/Jakarta",
  });
  const newDate = new Date(createdAt);
  return newDate;
};

const options = {
  timeZone: "Asia/Jakarta",
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  dateStyle: "medium",
  timeStyle: "long",
  hour12: false,
};

const dateToString = (date) => {
  const string = date.toLocaleString("id-ID", options);
  return string;
};

module.exports = { syncDate, dateToString };
