import _ from 'lodash';
import { getUser } from './users'

const listOfLinks = [
  {
    "id": "cj4jo6xxat8o901420m0yy60i",
    "description": "The coolest GraphQL backend 😎",
    "url": "https://graph.cool",
    votes: 0
  },
  {
    "id": "cj4jo6z4it8on0142p7q015hc",
    "description": "The best GraphQL client",
    "url": "http://dev.apollodata.com/",
    votes: 0
  }
];

export const allLinks = ({ filter = '' }) => (
  _.filter(listOfLinks, item => item.description.indexOf(filter) !== -1 || item.url.indexOf(filter) !== -1)
);

export const createLink = ({ description, url, postedById }) => {
  const newLink = {
    id: `blah${Math.floor(Math.random() * 100) + 1}`,
    description,
    url,
    postedBy: getUser(postedById),
    votes: 0
  }

  listOfLinks.push(newLink);
  return newLink;
};

export const createVote = ({ linkId }) => {
  const link = _.find(listOfLinks, link => {
    return linkId === link.id;
  });

  return { votes: ++link.votes };
};