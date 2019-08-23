export const isNullOrUndefined = (o: any) => (o === null || o === undefined);
export const isEmpty = (o: any) => Object.keys(o).length === 0;

export const isObject = (item: any) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

export function patchObject<S>(current: S, update: Partial<S>): S {
    return Object.assign({}, current, update);
}

export function cloneObject<T>(source: T): T {
    return !source ? source : JSON.parse(JSON.stringify(source));
}

const isDate = (d: any) => d instanceof Date;
const properObject = (o: any) => isObject(o) && !o.hasOwnProperty ? { ...o } : o;

export const diffObjects = (lhs: any, rhs: any): any => {
    if (lhs === rhs) {
        return {}; // equal return no diff
    }

    if (!isObject(lhs) || !isObject(rhs)) {
        return rhs; // return updated rhs
    }

    const l = properObject(lhs);
    const r = properObject(rhs);

    const deletedValues = Object.keys(l).reduce((acc, key) => {
      return r.hasOwnProperty(key) ? acc : { ...acc, [key]: undefined };
    }, {});

    if (isDate(l) || isDate(r)) {
        if (l.valueOf() === r.valueOf()) {
            return {};
        }
      return r;
    }

    return Object.keys(r).reduce((acc, key) => {
        if (!l.hasOwnProperty(key)) {
            return { ...acc, [key]: r[key] }; // return added r key
        }

        const difference = diffObjects(l[key], r[key]);

        if (isObject(difference) && isEmpty(difference) && !isDate(difference)) {
            return acc; // return no diff
        }

        return { ...acc, [key]: difference }; // return updated key
    }, deletedValues);
  };
