import pubsub from '../pubsub';

export const Link = {
  subscribe: () => pubsub.asyncIterator('Link')
};

export const Vote = {
  subscribe: () => pubsub.asyncIterator('Vote')
}