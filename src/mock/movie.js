import {getRandomInteger} from "../utils/common";
import {generateDataFromArray} from "../utils/film";
import {generateListComments} from "./coment";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const titles = [
  `Made-for-each-other`,
  `Popeye-meets-sinbad`,
  `Sagebrush-trail`,
  `Santa-claus-conquers-the-martians`,
  `The-dance-of-life`,
  `The-great-flamarion`,
  `The-man-with-the-golden-arm`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const genres = [
  `Drama`,
  `Fantasy`,
  `Historical`,
  `Horror`
];

const directors = [
  `David Lynch`,
  `Stanley Kubrick`,
  `Robert Bresson`,
  `Alfred Hitchcock`,
  `Martin Scorsese`,
  `Clint Eastwood`
];

const writers = [
  `William Shakespeare`,
  `Edgar Allan Poe`,
  `Anne Frank`,
  `Paulo Coelho`,
  `Stephen King`,
  `Oscar Wilde`
];

const actors = [
  `Robert De Niro`,
  `Jack Nicholson`,
  `Marlon Brando`,
  `Denzel Washington`,
  `Katharine Hepburn`,
  `Humphrey Bogart`
];

const countries = [
  `France`,
  `United States`,
  `China`,
  `Spain`,
  `Italy`,
  `Turkey`,
  `United Kingdom`,
  `Germany`
];


const generateArrayForObject = (input) => {
  const randomLength = getRandomInteger(1, input.length - 1);
  let output = new Set();
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, input.length - 1);
    output.add(input[randomIndex]);
  }
  return Array.from(output);
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomLength = getRandomInteger(1, 5);
  let resultDescription = ``;
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    resultDescription += descriptions[randomIndex];
  }
  return resultDescription;
};


export const generateMovie = () => {
  return {
    id: generateId(),
    favorite: false,
    history: false,
    watch: false,
    title: generateDataFromArray(titles),
    alternativeTitle: generateDataFromArray(titles),
    totalRating: getRandomInteger(1, 10),
    poster: generateDataFromArray(posters),
    ageRating: getRandomInteger(0, 18),
    director: generateDataFromArray(directors),
    writers: generateArrayForObject(writers),
    actors: generateArrayForObject(actors),
    release: {
      date: getRandomInteger(1966, 2020),
      releaseCountry: generateDataFromArray(countries),
    },
    runtime: getRandomInteger(70, 130),
    genre: generateArrayForObject(genres),
    description: generateDescription(),
    comments: generateListComments(),
  };
};
