import { getLocalStorageKey } from "../services/getKey";

export const postUser = (userName, email, password) => {
  const URL = 'http://localhost:3001/users/create';
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ userName, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r);
};

export const login = (email, password) => {
  const URL = 'http://localhost:3001/users/login';
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());
}

export const fetchAllGames = () => {
  const URL = 'http://localhost:3001/games/all';

  const token = getLocalStorageKey('mixToken');

  return fetch(URL, {
    headers: {
      authorization: token,
    },
  }).then((r) => (r.json()));
};

export const buyGames = (buyList) => {
  const URL = 'http://localhost:3001/games/checkout';

  const token = getLocalStorageKey('mixToken');

  return fetch(URL, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buyList),
  }).then((r) => r.json());
};

export const postGame = (gameName, price, quantity, image) => {
  const URL = 'http://localhost:3001/games/create';

  const token = getLocalStorageKey('mixToken');

  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ gameName, quantity, price, image }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  });
};
