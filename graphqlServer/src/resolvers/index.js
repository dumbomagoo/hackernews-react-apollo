import { allLinks, createLink, createVote } from './links';
import { hello, updateHello } from './hello';
import { signUpUser, authenticateUser } from './users';
import { Link, Vote } from './subscriptions';

export default {
  Query: {
    hello,
    allLinks
  },
  Mutation: {
    updateHello,
    createLink,
    createVote,
    signUpUser,
    authenticateUser
  },
  Subscription: {
    Link,
    Vote
  }
};