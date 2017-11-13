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

export const allLinks = () => listOfLinks;

export const createLink = ({ description, url, postedById }) => {
  const newLink = {
    id: Math.floor(Math.random() * 100) + 1,
    description,
    url,
    postedBy: getUser(postedById),
    votes: 0
  }

  listOfLinks.push(newLink);
  return newLink;
};