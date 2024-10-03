export const getMinutes = (time: number): string => {
  return fillWithZeros(Math.floor(time / 60));
};

export const getSeconds = (time: number): string => {
  return fillWithZeros(time - Math.floor(time / 60) * 60);
};

const fillWithZeros = (n: number): string => n.toString().padStart(2, "0");
