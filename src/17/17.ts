import { readLines } from "../utils";
import { Game } from "./game";

export const enum Jet {
  Left = "<",
  Right = ">",
}
const parseJet = (jet: string): Jet => (jet === "<" ? Jet.Left : Jet.Right);
export const parseJets = (jets: string): Jet[] => jets.split("").map(parseJet);

export const part1 = (filename: string): number => {
  const line = readLines(filename)[0];
  const jets = parseJets(line);

  const game = new Game(jets);
  game.run(2022);

  return game.level.height;
};
