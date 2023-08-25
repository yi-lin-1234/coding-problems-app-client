export type Question = {
  id: string;
  name: string;
  topic: string;
  difficulty: string;
  description: string;
  testCases: string;
  hints: string;
  video: string;
  solution: string;
  link: string;
  starter: string;
  createdAt: string;
};

export type Body = {
  name: string;
  topic: string;
  difficulty: string;
  description: string;
  testCases: string;
  hints: string;
  video: string;
  solution: string;
  link: string;
  starter: string;
};

export type CustomRadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export type GroupedDataTopic = {
  topic: string;
  count: number;
};

export type GroupedDataDifficulty = {
  difficulty: string;
  count: number;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};

export type Colors = {
  EASY: string;
  MEDIUM: string;
  HARD: string;
};
