import { PUZZLE_TYPES } from "../utils/constants.mjs";
import { resetAppElement } from "../utils/display.mjs";

let puzzleType = PUZZLE_TYPES.EXAMPLE;

export const getPuzzle = (puzzles) => puzzles[puzzleType];

export const changePuzzleType = async (day) => {
  puzzleType =
    puzzleType === PUZZLE_TYPES.INPUT
      ? PUZZLE_TYPES.EXAMPLE
      : PUZZLE_TYPES.INPUT;
  resetAppElement();
  await day();
};
