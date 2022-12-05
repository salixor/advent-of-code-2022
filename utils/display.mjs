export const getAppElement = () => {
  return document.getElementById("app");
};

export const resetAppElement = () => {
  getAppElement().innerHTML = null;
};
