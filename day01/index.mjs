import { PUZZLE_PARTS } from "../utils/constants.mjs";
import { sum } from "../utils/arrays.mjs";
import {
  getAppElement,
  displayPuzzleSolutionValue,
} from "../utils/display.mjs";
import { getPuzzle } from "../utils/puzzles-loader.mjs";

const foodInventoryDisplay = (value) => {
  const { list: inventory, caloriesSum } = value;

  const inventoryElement = document.createElement("div");
  inventoryElement.className = "inventory";

  const totalCaloriesElement = document.createElement("div");
  totalCaloriesElement.classList.add("sum-of-calories");
  totalCaloriesElement.innerText = caloriesSum;

  const caloriesListElement = document.createElement("ul");
  inventory.forEach((calories) => {
    const calorieElement = document.createElement("li");
    calorieElement.innerText = calories;
    caloriesListElement.appendChild(calorieElement);
  });

  inventoryElement.appendChild(totalCaloriesElement);
  inventoryElement.appendChild(caloriesListElement);

  return {
    caloriesSum,
    inventoryElement,
  };
};

const display = (list) => {
  const inventoryDisplays = list.map(foodInventoryDisplay);

  let currentSum = 0;
  inventoryDisplays.forEach(({ caloriesSum, inventoryElement }, index) => {
    currentSum += caloriesSum;
    if (index < 3) inventoryElement.classList.add("sum-top-three");
    getAppElement().appendChild(inventoryElement);
  });
};

const getListOfElvesCaloriesWithSum = async () => {
  return (await getPuzzle())
    .split("\n\n")
    .map((l) => l.split("\n").map((v) => +v))
    .map((list) => ({ list, caloriesSum: sum(list) }))
    .sort((a, b) => b.caloriesSum - a.caloriesSum);
};

const firstPart = async () => {
  const elvesCaloriesWithSum = await getListOfElvesCaloriesWithSum();
  const topSum = elvesCaloriesWithSum[0].caloriesSum;

  displayPuzzleSolutionValue(topSum);
  display(elvesCaloriesWithSum);
};

const secondPart = async () => {
  const elvesCaloriesWithSum = await getListOfElvesCaloriesWithSum();
  const topThree = elvesCaloriesWithSum.slice(0, 3);
  const topThreeCaloriesSum = sum(topThree.map((s) => s.caloriesSum));

  displayPuzzleSolutionValue(topThreeCaloriesSum);
  display(elvesCaloriesWithSum);
};

export default {
  [PUZZLE_PARTS.PART_ONE]: firstPart,
  [PUZZLE_PARTS.PART_TWO]: secondPart,
  start: firstPart,
};
