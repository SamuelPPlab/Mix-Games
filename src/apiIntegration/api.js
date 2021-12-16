export const postUser = (userName, email, password) => {
  const URL = 'http://localhost:3001/users/create';
  const options = {
    method: 'POST',
    body: JSON.stringify({ userName, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(URL, options).then((r) => r);
};