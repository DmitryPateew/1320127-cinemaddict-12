import {getRandomInteger} from "../utils";

export const generateFilter = () => {
  return {
    watchlist: getRandomInteger(0, 50),
    alreadyWatched: getRandomInteger(0, 50),
    favorite: getRandomInteger(0, 50),
  };
};
