import { surpriseMePrompts } from "../constants";
import { saveAs } from "file-saver";

export const getRandomPrompt = (prompt: any) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) getRandomPrompt(prompt);
  return randomPrompt;
};

export const downloadImage = async (_id, photo) => {
  saveAs(photo, `download-${_id}.jpg`);
};
