import { exposeWorker } from 'react-hooks-worker';

export function greet(subject: string) {
  return `Hello, ${subject}!`;
}


exposeWorker(greet);
