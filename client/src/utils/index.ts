import { surpriseMePrompts } from "../constants";

export const getRandomPrompt = (prompt: any) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) getRandomPrompt(prompt);
  return randomPrompt;
};
