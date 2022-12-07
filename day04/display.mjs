import { getAppElement } from "../utils/display.mjs";

export const displayPart = (solver) => async () => {
  const [solution, totalConcerned] = await solver();

  const totalElement = document.createElement("div");
  totalElement.className = "total-element";
  totalElement.innerText = totalConcerned;
  getAppElement().appendChild(totalElement);

  const allRangesElement = document.createElement("div");
  allRangesElement.className = "all-ranges";
  getAppElement().appendChild(allRangesElement);

  solution.forEach(({ a, b, aIncludesB, bIncludesA, overlaps }) => {
    const pairOfRangeElement = displayPairOfRanges(a, b);
    aIncludesB && pairOfRangeElement.classList.add("a-includes-b");
    bIncludesA && pairOfRangeElement.classList.add("b-includes-a");
    overlaps && pairOfRangeElement.classList.add("overlaps");
    allRangesElement.appendChild(pairOfRangeElement);
  });
};

const createRangeExtremityElement = (value, className) => {
  const element = document.createElement("span");
  element.innerText = value;
  element.className = className;
  return element;
};

const createRangeElement = (range, className) => [
  createRangeExtremityElement(range.start, className),
  createRangeExtremityElement(range.end, className),
];

export const displayPairOfRanges = (rangeA, rangeB) => {
  const pairOfRangesElement = document.createElement("div");
  pairOfRangesElement.className = "pair-of-ranges";

  [
    ...createRangeElement(rangeA, "first-range"),
    ...createRangeElement(rangeB, "second-range"),
  ].forEach((el) => pairOfRangesElement.appendChild(el));

  return pairOfRangesElement;
};
