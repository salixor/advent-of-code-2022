import { PUZZLE_TYPES } from "./constants.mjs";
import { resetAppElement } from "./display.mjs";
import { readTextFile } from "./read-file.mjs";

const PUZZLES = {
  [PUZZLE_TYPES.EXAMPLE]: readTextFile("./puzzle-example.txt"),
  [PUZZLE_TYPES.INPUT]: readTextFile("./puzzle-input.txt"),
};

let puzzleType = PUZZLE_TYPES.EXAMPLE;

export const getPuzzle = () => PUZZLES[puzzleType];

export const changePuzzleType = async (day) => {
  puzzleType =
    puzzleType === PUZZLE_TYPES.INPUT
      ? PUZZLE_TYPES.EXAMPLE
      : PUZZLE_TYPES.INPUT;
  resetAppElement();
  await day();
};
