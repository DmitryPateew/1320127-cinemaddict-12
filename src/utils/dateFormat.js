import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(`Y/MMMM/DD HH:mm`);

};

export const formatFilmTime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(`HH[h] mm[m]`);
};

export const formatReleaseDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(`DD MMMM YYYY`);
};
