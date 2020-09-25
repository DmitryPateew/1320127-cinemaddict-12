import {LENGTH__LINE} from "../consant.js";
import {START__DATE} from "../consant.js";
import {END__DATE} from "../consant.js";

import {generateDataFromArray} from "../utils/film";
import CommentView from "../view/comentView.js";

function randomChars(length) {
  let result = ``;
  let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const names = [
  `Liam`,
  `Noah`,
  `Emma`,
  `Olivia`,
  `William`,
  `James`,
  `Isabella`,
  `Benjamin`,
];

export const generateComment = () => {
  return {
    author: generateDataFromArray(names),
    comment: randomChars(LENGTH__LINE),
    date: randomDate(START__DATE, END__DATE),
    emotion: generateDataFromArray(emotions)
  };
};


export const generateListComments = () => {
  const commentsLine = [];
  for (let i = 0; i < 5; i++) {
    const exeactComment = new CommentView(generateComment());
    commentsLine.push(exeactComment.getElement());
  }
  return commentsLine;
};

