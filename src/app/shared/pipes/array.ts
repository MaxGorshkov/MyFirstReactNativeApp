export const uniqueStrings = (arr: string[]): string[] =>
    arr.filter((v, i, a) => a.indexOf(v) === i);
