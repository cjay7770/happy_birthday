export const GOALS_TO_WIN = 3;
export const GOAL_COLUMNS = 3;
export const GOAL_ROWS = 2;

export const GOAL_LINES = [
  'Top bins!',
  'Absolute screamer!',
  'Right in the corner!',
  'Find the net!',
  'Buried it!',
  'Ice cold!',
];

export const SAVE_LINES = [
  'The keeper says NO!',
  'Denied!',
  'What a stop!',
  'Straight into the gloves!',
  'Not today!',
  'Big save!',
];

export const pickKeeperColumn = () => Math.floor(Math.random() * GOAL_COLUMNS);

export const pickLine = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)];
