import { PUZZLE_PARTS } from "../utils/constants.mjs";
import { sum } from "../utils/arrays.mjs";
import { getAppElement } from "../utils/display.mjs";
import { getPuzzle } from "../utils/puzzles-loader.mjs";

const MATCH_RESULT = {
  LOSS: "LOSS",
  DRAW: "DRAW",
  WIN: "WIN",
};

const RESULT_SCORES = {
  [MATCH_RESULT.LOSS]: 0,
  [MATCH_RESULT.DRAW]: 3,
  [MATCH_RESULT.WIN]: 6,
};

const SHAPES = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const OPPONENT_TO_SHAPE = {
  A: SHAPES.ROCK,
  B: SHAPES.PAPER,
  C: SHAPES.SCISSORS,
};

const SELF_TO_SHAPE = {
  X: SHAPES.ROCK,
  Y: SHAPES.PAPER,
  Z: SHAPES.SCISSORS,
};

const RESULTS_LETTERS = {
  X: MATCH_RESULT.LOSS,
  Y: MATCH_RESULT.DRAW,
  Z: MATCH_RESULT.WIN,
};

const getEmoji = (move) => {
  if (move === 1) return "🪨";
  if (move === 2) return "📃";
  if (move === 3) return "✂️";
};

const toShape = (move) => OPPONENT_TO_SHAPE[move] || SELF_TO_SHAPE[move];

const computeRoundResult = (opponentMove, selfMove) => {
  const c = (selfMove - opponentMove + 3) % 3;
  if (c === 0) {
    return MATCH_RESULT.DRAW;
  } else if (c === 1) {
    return MATCH_RESULT.WIN;
  } else {
    return MATCH_RESULT.LOSS;
  }
};

const computeMoveForResult = (opponentMove, desiredResult) => {
  if (desiredResult === MATCH_RESULT.DRAW) {
    return opponentMove;
  } else if (desiredResult === MATCH_RESULT.WIN) {
    return (opponentMove + 1) % 3 || 3;
  } else {
    return (opponentMove + 2) % 3 || 3;
  }
};

const matchDisplay = (value) => {
  const matchElement = document.createElement("div");
  matchElement.className = `match ${value.result.toLowerCase()}`;

  const opponentElement = document.createElement("span");
  opponentElement.innerText = getEmoji(value.opponentMove);

  const selfElement = document.createElement("span");
  selfElement.innerText = getEmoji(value.selfMove);

  const matchResultElement = document.createElement("span");
  matchResultElement.innerText = value.result;

  const scoreElement = document.createElement("span");
  scoreElement.innerText = value.score;

  matchElement.appendChild(opponentElement);
  matchElement.appendChild(selfElement);
  matchElement.appendChild(matchResultElement);
  matchElement.appendChild(scoreElement);

  return matchElement;
};

const withScore = ({ opponentMove, selfMove, result }) => {
  const resultScore = RESULT_SCORES[result];
  return {
    opponentMove,
    selfMove,
    result,
    score: selfMove + resultScore,
  };
};

const firstPartSolver = async () =>
  (await getPuzzle()).split("\n").map((l) => {
    const [opponentMove, selfMove] = l.split(" ").map(toShape);
    return withScore({
      opponentMove,
      selfMove,
      result: computeRoundResult(opponentMove, selfMove),
    });
  });

const secondPartSolver = async () =>
  (await getPuzzle()).split("\n").map((l) => {
    const split = l.split(" ");
    const opponentMove = toShape(split[0]);
    const result = RESULTS_LETTERS[split[1]];
    return withScore({
      opponentMove,
      selfMove: computeMoveForResult(opponentMove, result),
      result,
    });
  });

const displayPart = (solver) => async () => {
  const solution = await solver();

  const displays = solution.map(matchDisplay);
  const totalScore = sum(solution.map((i) => i.score));

  const totalScoreElement = document.createElement("div");
  totalScoreElement.className = "total-score";
  totalScoreElement.innerText = totalScore;

  const matchesElement = document.createElement("div");
  matchesElement.className = "all-matches";

  displays.forEach((el) => matchesElement.appendChild(el));

  getAppElement().appendChild(totalScoreElement);
  getAppElement().appendChild(matchesElement);
};

export default {
  [PUZZLE_PARTS.PART_ONE]: displayPart(firstPartSolver),
  [PUZZLE_PARTS.PART_TWO]: displayPart(secondPartSolver),
  start: displayPart(firstPartSolver),
};
