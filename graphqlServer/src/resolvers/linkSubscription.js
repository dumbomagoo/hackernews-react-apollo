import pubsub from '../pubsub';

const Link = {
  subscribe: () => pubsub.asyncIterator('Link')
};

export default Link;