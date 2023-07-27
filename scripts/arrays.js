import { TYPE_CATEGORY } from './types.js';

export const data = [
  {
    id: '1',
    name: 'Shopping list',
    created: new Date('April 20, 2021'),
    category: TYPE_CATEGORY.TASK,
    content: 'Tomatoes, bread',
    dates: [],
  },
  {
    id: '2',
    name: 'The theory of evolution',
    created: new Date('April 27, 2021'),
    category: TYPE_CATEGORY.RANDOM_THOUGHT,
    content: 'The evolution...',
    dates: [],
  },
  {
    id: '3',
    name: 'New feature',
    created: new Date('May 05, 2021'),
    category: TYPE_CATEGORY.IDEA,
    content: 'Implement new...',
    dates: [],
  },
  {
    id: '4',
    name: 'William Gaddis',
    created: new Date('May 07, 2021'),
    category: TYPE_CATEGORY.QUOTE,
    content: `Power doesn't co...`,
    dates: [],
  },
  {
    id: '5',
    name: 'Books',
    created: new Date('May 15, 2021'),
    category: TYPE_CATEGORY.TASK,
    content: 'The Learn Startup',
    dates: [],
  },
];

export const archive = [
  {
    id: 'kd',
    name: 'Buy',
    created: new Date('May 15, 2021'),
    category: TYPE_CATEGORY.TASK,
    content: 'Buy a meat pizza',
    dates: [],
  },
];
