import {MINUTES__IN__HOURS} from "./consant.js";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const transleteTimeInHours = (minute) => {
  let hours = Number(minute) / MINUTES__IN__HOURS;
  return hours > 1 ? Math.trunc(hours) + `h ` + (minute - MINUTES__IN__HOURS) + `m` : minute + `m`;
};

export const generateDataFromArray = (descriptions) => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
