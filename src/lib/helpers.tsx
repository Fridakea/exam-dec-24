import { apiBaseUrl } from "./api";

export const clamp = (min: number, num: number, max: number) => {
  return Math.max(min, Math.min(num, max));
};

export const findBandImage = (logo: string): string => {
  return logo.includes("https") ? logo : `${apiBaseUrl}/logos/${logo}`;
};
