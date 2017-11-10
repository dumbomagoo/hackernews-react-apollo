import _ from 'lodash';

const users = [];

export const signUpUser = inputs => {
  const {
    user: {
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
    authenticateInfo: {
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

/*
 * This function is not a resolver and is a helper
 */
export const getUser = id => {
  return _.find(users, user => {
    // For some reason comparing the ids with triple equals was returning false
    return user.id == id;
  });
};
  