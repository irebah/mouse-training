export const getMinutes = (seconds: number): string => {
  return fillWithZeros(seconds < 60 ? 0 : Math.floor(seconds / 60));
};

export const getSeconds = (seconds: number): string => {
  return fillWithZeros(
    seconds < 60 ? seconds : seconds - Math.floor(seconds / 60) * 60
  );
};

const fillWithZeros = (n: number): string => n.toString().padStart(2, "0");
