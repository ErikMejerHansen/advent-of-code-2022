export const enum Jet {
  Left = "<",
  Right = ">",
}
export const parseJet = (jet: string) => (jet === "<" ? Jet.Left : Jet.Right);
