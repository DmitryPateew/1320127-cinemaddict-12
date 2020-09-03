import {LENGTH__LINE} from "../consant.js";
import {START__DATE} from "../consant.js";
import {END__DATE} from "../consant.js";
import {COUNT__COMMENT} from "../consant.js";

import {generateDataFromArray} from "../utils.js";
import {commentGenerate} from "../view/coment.js";

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

const generateComment = () => {
  return {
    author: generateDataFromArray(names),
    comment: randomChars(LENGTH__LINE),
    date: randomDate(START__DATE, END__DATE),
    emotion: generateDataFromArray(emotions)
  };
};

const comments = new Array(COUNT__COMMENT).fill().map(generateComment);

export const generateListComments = () => {
  let commentsLine = [];
  for (let i = 0; i < comments.length; i++) {
    commentsLine.push(commentGenerate(comments[i]));
  }
  return commentsLine;
};

