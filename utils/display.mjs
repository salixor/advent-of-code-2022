export const getAppElement = () => {
  return document.getElementById("app");
};

export const resetAppElement = () => {
  getAppElement().innerHTML = null;
};

export const displayPuzzleSolutionValue = (total) => {
  const totalElement = document.createElement("div");
  totalElement.className = "total-element";
  totalElement.innerText = total;
  getAppElement().appendChild(totalElement);
};
