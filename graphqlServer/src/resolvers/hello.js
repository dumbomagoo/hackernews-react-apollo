
let savedName = 'World';

export const hello = () => {
  return `Hello ${savedName}`;
};

export const updateHello = ({ name }) => {
  savedName = name;
  return hello();
};