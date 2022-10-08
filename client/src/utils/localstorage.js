const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return;
};
const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export { saveToLocalStorage, getFromLocalStorage };
