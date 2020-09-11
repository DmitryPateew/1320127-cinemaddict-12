import {MINUTES__IN__HOURS} from "../consant";
import {getRandomInteger} from "../utils/common";


export const transleteTimeInHours = (minute) => {
  let hours = Number(minute) / MINUTES__IN__HOURS;
  return hours > 1 ? Math.trunc(hours) + `h ` + (minute - MINUTES__IN__HOURS) + `m` : minute + `m`;
};

export const generateDataFromArray = (descriptions) => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortFilmUp = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.release.date, filmB.release.date);

  if (weight !== null) {
    return weight;
  }

  return filmB.release.date - filmA.release.date;
};

export const sortFilmUpRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.totalRating, filmB.totalRating);

  if (weight !== null) {
    return weight;
  }

  return filmB.totalRating - filmA.totalRating;
};
