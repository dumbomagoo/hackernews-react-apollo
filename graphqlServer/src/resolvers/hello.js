
let savedName = 'World';

export const hello = () => {
  return `Hello ${savedName}`;
};

export const updateHello = (root, { name }) => {
  savedName = name;
  return hello();
};