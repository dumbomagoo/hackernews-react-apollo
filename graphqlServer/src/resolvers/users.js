import _ from 'lodash';

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

export const authenticateUser = inputs => {
  const {
    input: {
      email,
      password
    }
  } = inputs;

  const foundUser = _.find(users, user => {
    return user.email === email && user.password === password;
  });

  return {
    token: '9999',
    user: { ...foundUser }
  };
};
  