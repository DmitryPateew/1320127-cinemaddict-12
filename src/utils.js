export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const transleteTimeInHours = (minute) => {
  let result;
  const minutesInHours = 60;
  let hours = Number(minute) / minutesInHours;
  if (hours > 1) {
    result = Math.trunc(hours) + `h ` + (minute - minutesInHours) + `m`;
  } else {
    result = minute + `m`;
  }
  return result;
};

export const generateDataFromArray = (descriptionArray) => {
  const randomIndex = getRandomInteger(0, descriptionArray.length - 1);
  return descriptionArray[randomIndex];
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
