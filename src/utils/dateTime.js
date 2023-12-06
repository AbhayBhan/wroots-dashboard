import dayjs from "dayjs";

export const formatTimestamp = (timestamp) => {
  return dayjs(timestamp).format("DD/MM/YYYY @ HH:mm");
};

export const formatDateForInput = (timestamp) => {
  return dayjs(timestamp).format("YYYY-MM-DD");
};

export const dayDifference = (from, to) => {
  const date1 = dayjs(from);
  const date2 = dayjs(to);
  return date1.diff(date2);
};

export function getFirstDayOfYear() {
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0));
  // const formattedDate = firstDayOfYear.toISOString().split('T')[0];
  return firstDayOfYear;
}

export function getFirstDateOfCurrentYear() {
  const currentYear = dayjs().year();
  const firstDateOfCurrentYear = `${currentYear}-01-01`;
  return firstDateOfCurrentYear;
}

export function getNow() {
  const currentDate = dayjs().format("YYYY-MM-DD");
  return currentDate;
}

export function getCurrentDate() {
  const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().split('T')[0];
  return currentDate;
}

export function formatDateOnlyString(dateValue) {
  const formattedDate = dateValue.toISOString().split("T")[0];
  return formattedDate;
}

export function formatDateString(dateValue) {
  const date = new Date(dateValue);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}
