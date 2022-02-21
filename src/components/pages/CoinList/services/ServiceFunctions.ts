export const roundPrice = (e: number) => {
  const firstChar = e.toString().split(".");
  return firstChar[0] === "0" && firstChar[1][0] === "0"
    ? e.toFixed(7)
    : e.toFixed(2);
};
export const roundToBillions = (item: number) => {
  return Math.abs(Number(item)) >= 1.0e9
    ? (Math.abs(Number(item)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(item)) >= 1.0e6
    ? (Math.abs(Number(item)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(item)) >= 1.0e3
    ? (Math.abs(Number(item)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(item));
};
