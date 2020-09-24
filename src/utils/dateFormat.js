import moment from "moment";
import {TimeFormat} from "../consant";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(TimeFormat.COMMENT);

};

export const formatFilmTime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(TimeFormat.FILM);
};

export const formatReleaseDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(TimeFormat.REALISE);
};
