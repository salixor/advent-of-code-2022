import { PUZZLE_PARTS } from "../utils/constants.mjs";
import { getPuzzle } from "../utils/puzzles-loader.mjs";

import { displayPart } from "./display.mjs";

const rangeIncludes = (a, b) => a.start <= b.start && a.end >= b.end;
const rangesOverlap = (a, b) => a.start <= b.start && b.start <= a.end;

const makeRangeFromInput = (input) => {
  const [start, end] = input.split("-").map((i) => parseInt(i, 10));
  return { start, end };
};

const getRanges = async () => {
  const lines = (await getPuzzle()).split("\n");
  return lines.map((l) => {
    const unsanitized = l.split(",");
    return unsanitized.map(makeRangeFromInput);
  });
};

const genericReturn = async (solver) => {
  const solution = (await getRanges()).map(solver);
  const totalConcerned = solution.filter((s) => s.included).length;
  return [solution, totalConcerned];
};

const firstPartSolver = () =>
  genericReturn(([a, b]) => {
    const aIncludesB = rangeIncludes(a, b);
    const bIncludesA = rangeIncludes(b, a);
    const included = aIncludesB || bIncludesA;
    return { a, b, aIncludesB, bIncludesA, included };
  });

const secondPartSolver = () =>
  genericReturn(([a, b]) => {
    const included = rangesOverlap(a, b) || rangesOverlap(b, a);
    return { a, b, overlaps: included, included };
  });

export default {
  [PUZZLE_PARTS.PART_ONE]: displayPart(firstPartSolver),
  [PUZZLE_PARTS.PART_TWO]: displayPart(secondPartSolver),
  start: displayPart(firstPartSolver),
};
