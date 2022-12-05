import { sum } from "../utils/arrays.mjs";
import { PUZZLE_TYPES } from "../utils/constants.mjs";
import { getAppElement } from "../utils/display.mjs";
import { readTextFile } from "../utils/read-file.mjs";
import { getPuzzle } from "../utils/puzzles-loader.mjs";

const PUZZLES = {
  [PUZZLE_TYPES.EXAMPLE]: readTextFile("./puzzle-example.txt"),
  [PUZZLE_TYPES.INPUT]: readTextFile("./puzzle-input.txt"),
};

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

export default async () => {
  const puzzle = await getPuzzle(PUZZLES);

  const listOfElvesCaloriesWithSum = puzzle
    .split("\n\n")
    .map((l) => l.split("\n").map((v) => +v))
    .map((list) => ({ list, caloriesSum: sum(list) }))
    .sort((a, b) => b.caloriesSum - a.caloriesSum);

  const inventoryDisplays =
    listOfElvesCaloriesWithSum.map(foodInventoryDisplay);

  let currentSum = 0;
  inventoryDisplays.forEach(({ caloriesSum, inventoryElement }, index) => {
    currentSum += caloriesSum;
    if (index === 0) inventoryElement.classList.add("sum-max");
    else if (index < 3) inventoryElement.classList.add("sum-top-three");
    getAppElement().appendChild(inventoryElement);

    if (index === 2) {
      const topThreeSumElement = document.createElement("div");
      topThreeSumElement.className = "top-three-sum-value";
      topThreeSumElement.innerText = currentSum;
      getAppElement().appendChild(topThreeSumElement);
    }
  });
};
