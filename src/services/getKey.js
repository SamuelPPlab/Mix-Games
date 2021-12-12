export const getLocalStorageKey = (key) => {
  const doesKeyExist = JSON.parse(localStorage.getItem(key));

  if(!doesKeyExist) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(key));
};
