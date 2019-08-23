import { isObject } from './object';

export const mergeDeep = (target: any, ...sources: any[]): any => {
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();

    if (target === undefined) {
        target = {};
    }

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
};


export const getDeepValue = (obj: any, path: string): any => {
    if (!obj || !path) {
        return null;
    }

    let result = obj;
    path.split('.').forEach((fieldName) => {
        if (result !== undefined) {
            result = result[fieldName];
        }
    });
    return result;
};

export const setDeepValue = (obj: any, path: string, value: any): void => {
    if (!obj || !path) {
        return;
    }

    let node = obj;
    path.split('.').forEach((fieldName, index, array) => {
        const isLastItem = (index === (array.length - 1));
        if (node[fieldName] === undefined || isLastItem) {
            node[fieldName] = isLastItem ? value : {};
        }
        node = node[fieldName];
    });
};
