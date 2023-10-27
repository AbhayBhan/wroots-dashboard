export function formatNumberWithKM(number) {
  number = parseInt(number);
  if (number >= 1000000) {
    const num = (number / 1000000).toFixed(1);
    return num + "M";
  } else if (number >= 1000) {
    const num = Math.floor(number / 1000);
    return num + "k";
  }
  return number.toString();
}
