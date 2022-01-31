export const arrayIntersect = <T>(a: Array<T>, b: Array<T>) => {
  const setB = new Set(b);
  return [...Array.from(new Set(a))].filter(x => setB.has(x));
};

export const arrayDifference = <T>(a: Array<T>, b: Array<T>) => {
  const setB = new Set(b);
  return [...Array.from(new Set(a))].filter(x => !setB.has(x));
};

export const isArrayEquals = <T>(a: Array<T>, b: Array<T>) => {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
};