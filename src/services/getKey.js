export const getLocalStorageKey = (key) => {
  // Função para criar ou buscar item no local storage
  const doesKeyExist = JSON.parse(localStorage.getItem(key));

  if(!doesKeyExist) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(key));
};
