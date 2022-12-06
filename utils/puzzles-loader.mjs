import { PUZZLE_TYPES, PUZZLE_PARTS } from "./constants.mjs";
import { resetAppElement } from "./display.mjs";
import { readTextFile } from "./read-file.mjs";

export const getSelectedDay = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("day");
};

export const getDayFolder = () => {
  const day = getSelectedDay();
  return day ? `./day${day}` : undefined;
};

const getPuzzles = () => {
  const dayFolder = getDayFolder();
  return {
    [PUZZLE_TYPES.EXAMPLE]: readTextFile(`${dayFolder}/puzzle-example.txt`),
    [PUZZLE_TYPES.INPUT]: readTextFile(`${dayFolder}/puzzle-input.txt`),
  };
};

let puzzleType = PUZZLE_TYPES.EXAMPLE;
let puzzlePart = PUZZLE_PARTS.PART_ONE;

export const getPuzzle = () => getPuzzles()[puzzleType];

export const changePuzzleType = async (day) => {
  puzzleType =
    puzzleType === PUZZLE_TYPES.INPUT
      ? PUZZLE_TYPES.EXAMPLE
      : PUZZLE_TYPES.INPUT;
  resetAppElement();
  await day[puzzlePart]();
};

export const changePuzzlePart = async (day) => {
  puzzlePart =
    puzzlePart === PUZZLE_PARTS.PART_ONE
      ? PUZZLE_PARTS.PART_TWO
      : PUZZLE_PARTS.PART_ONE;
  resetAppElement();
  await day[puzzlePart]();
};
