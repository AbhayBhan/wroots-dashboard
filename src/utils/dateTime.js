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

export function getCurrentDate() {
  const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().split('T')[0]; 
  return currentDate;
}

export function formatDateOnlyString(dateValue){
  const formattedDate = dateValue.toISOString().split('T')[0];
  return formattedDate;
}

