export const mixList = (list: number[]): number[] => {
  const mixedList = new Array<number>(...list);

  for (let i = 0; i < list.length; i++) {
    move(list, i);
  }

  return mixedList;
};

const move = (list: number[], index: number): number[] => {
  const value = list[index];
  const newPosition = index + value + 1;

  // Add the number to its new position...
  list.splice(newPosition, 0, value);
  console.log("new value inserted:", list);

  // then remove it from its old position
  list.splice(index, 1);
  console.log("old value removed:", list);
  return list;
};
