const users = [];

export const signUpUser = inputs => {
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
  return { ...newUser, token: '9999' };
};

export const authenticateUser = ({ email, password, name }) => {
  // TODO need lodash!  Or just always return success
};