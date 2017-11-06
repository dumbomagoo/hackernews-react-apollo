const users = [];

export const createUser = inputs => {
  const {
    input: {
      name,
      email,
      password
    }
  } = inputs;

  const newUser = {
    id: Math.floor(Math.random() * 100) + 1,
    name,
    email,
    password,
    links: []
  };

  users.push(newUser);
  return newUser;
};

export const signInUser = ({ email, password }) => {
  // TODO need lodash!
};