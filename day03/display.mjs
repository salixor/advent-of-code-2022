import { splitArray } from "../utils/arrays.mjs";
import { getAppElement } from "../utils/display.mjs";

const makeDisplayForCompartment = (compartment, concernedItem) => {
  const compartmentElement = document.createElement("div");
  compartmentElement.className = "compartment";

  compartment.forEach((item) => {
    const itemElement = document.createElement("span");
    itemElement.innerText = item;
    itemElement.className =
      item === concernedItem ? "highlighted-item" : "item";
    compartmentElement.appendChild(itemElement);
  });

  return compartmentElement;
};

export const makeDisplayRucksack = (rucksack, concernedItem) => {
  const [left, right] = splitArray(rucksack);

  const rucksackElement = document.createElement("div");
  rucksackElement.className = "rucksack";

  const leftElement = makeDisplayForCompartment(left, concernedItem);
  const rightElement = makeDisplayForCompartment(right, concernedItem);

  rucksackElement.appendChild(leftElement);
  rucksackElement.appendChild(rightElement);

  return rucksackElement;
};

export const makeDisplayElvesGroup = (elvesGroup, badge) => {
  const elvesGroupElement = document.createElement("div");
  elvesGroupElement.className = "elves-group";

  elvesGroup.forEach((rucksack) => {
    elvesGroupElement.appendChild(makeDisplayRucksack(rucksack, badge));
  });

  return elvesGroupElement;
};

export const displayPart = (solver, displayer) => async () => {
  const [storagesForDisplay, itemsToHighlight, totalPriority] = await solver();

  const totalPriorityElement = document.createElement("div");
  totalPriorityElement.className = "total-priority";
  totalPriorityElement.innerText = totalPriority;
  getAppElement().appendChild(totalPriorityElement);

  storagesForDisplay.forEach((v, index) => {
    const el = displayer(v, itemsToHighlight[index]);
    getAppElement().appendChild(el);
  });
};
