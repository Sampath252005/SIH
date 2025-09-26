// lib/getSections.js
import data from "../app/data/section.json";

export function getSections() {
  // Convert object to array
  return Object.values(data);
}
