import { PUZZLE_PARTS } from "../utils/constants.mjs";
import { sum } from "../utils/arrays.mjs";
import { getAppElement } from "../utils/display.mjs";
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

const firstPart = async () => {
  const puzzle = await getPuzzle();

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

export default {
  [PUZZLE_PARTS.PART_ONE]: firstPart,
  [PUZZLE_PARTS.PART_TWO]: firstPart,
  start: firstPart,
};
