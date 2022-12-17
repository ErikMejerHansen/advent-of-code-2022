export const enum Jet {
  Left = "<",
  Right = ">",
}
const parseJet = (jet: string): Jet => (jet === "<" ? Jet.Left : Jet.Right);
export const parseJets = (jets: string): Jet[] => jets.split("").map(parseJet);
