import { PUZZLE_PARTS } from "../utils/constants.mjs";
import { sum, splitArray, makeGroupsOfArrays } from "../utils/arrays.mjs";
import { getPuzzle } from "../utils/puzzles-loader.mjs";

import {
  makeDisplayRucksack,
  makeDisplayElvesGroup,
  displayPart,
} from "./display.mjs";

const computeItemPriority = (item) => {
  const unicodeValue = item.charCodeAt(0) - 96;
  return unicodeValue + 58 * (unicodeValue < 0);
};

const getAllItemsInStorages = (storages) => {
  return [...new Set(storages.flatMap((r) => r))];
};

const countItemOccurencesInStorage = (storage) => {
  return storage.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: (acc[curr] || 0) + 1,
    }),
    {}
  );
};

const findCommonItems = (storages) => {
  const allItems = getAllItemsInStorages(storages);
  const itemCounts = storages.map(countItemOccurencesInStorage);
  return allItems.find((item) => itemCounts.every((count) => count[item] > 0));
};

const getRucksacks = async () => {
  return (await getPuzzle()).split("\n").map((l) => l.split(""));
};

const firstPartSolver = async () => {
  const rucksacks = await getRucksacks();
  const compartments = rucksacks.map(splitArray);
  const concernedItems = compartments.map(findCommonItems);
  const totalPriority = sum(concernedItems.flatMap(computeItemPriority));
  return [rucksacks, concernedItems, totalPriority];
};

const secondPartSolver = async () => {
  const rucksacks = await getRucksacks();
  const elvesGroups = makeGroupsOfArrays(rucksacks, 3);
  const badges = elvesGroups.map(findCommonItems);
  const totalPriority = sum(badges.flatMap(computeItemPriority));
  return [elvesGroups, badges, totalPriority];
};

export default {
  [PUZZLE_PARTS.PART_ONE]: displayPart(firstPartSolver, makeDisplayRucksack),
  [PUZZLE_PARTS.PART_TWO]: displayPart(secondPartSolver, makeDisplayElvesGroup),
  start: displayPart(firstPartSolver, makeDisplayRucksack),
};
