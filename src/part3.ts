import { Result, makeFailure, makeOk, bind, either } from "./lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

/* Question 3.1 */
export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    // YA - find an element that receive true for the pred(func)
    const found = a.find(pred);
    // YA - if exist return Result makeOk, else return Result makeFailure with msg
    return found !== undefined ? makeOk(found) : makeFailure("No element found.");
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

/* Question 3.2 */
export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {
    // YA - looking for the first even element in the array be findResult func
    // if exsit return Result with x * x, else - continue with the fail msg
    return bind(findResult(x => x % 2 === 0, a), (x: number) => makeOk(x * x));
};

/* Question 3.3 */
export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    // YA - take the number out of the Result "wrap" using the above func for find the even number
    // success - return x,  fail - return -1
    return either(returnSquaredIfFoundEven_v2(a), (x: number) => x, (message: string) => -1);
};