## Part 1: Theoretical Questions

Submit the solution to this part as `part1.md`.

### [25 points] Question 1.1

1. Explain in simple words the following programming paradigms:
   1. [5 points] Imperative
   Imperative: This paradigm focuses on the explicit control flow and how a task should be performed. It treats a program as a sequence of statements that directly change the program's state (memory) over time, often using loops (for, while) and mutable variables.
   1. [5 points] Object Oriented
   Object Oriented (OOP): This paradigm is based on "objects" that encapsulate both data (attributes) and behavior (methods). It emphasizes modularity and information hiding, allowing different parts of the program to interact through well-defined interfaces.
   1. [5 points] Functional
   Functional: This paradigm treats computation as the evaluation of mathematical functions and avoids changing state or mutable data. It relies on pure functions, where the output depends only on the input, and utilizes higher-order functions like map, filter, and reduce.
1. [5 points] How does the object oriented paradigm improve over the imperative paradigm?
  The OOP paradigm improves over the imperative approach by introducing Encapsulation and Modularity. In imperative programming, logic and data are often global and scattered, making large systems hard to maintain. OOP wraps related data and functions into objects, hiding internal implementation details and reducing complexity through abstraction.
1. [5 points] How does the functional paradigm improve over the object oriented paradigm?
  The functional paradigm improves over OOP by eliminating Side Effects and enforcing Immutability. In OOP, objects often maintain an internal state that changes over time, which can lead to unpredictable bugs, especially in concurrent systems. FP ensures that data is never modified in place, making the code more predictable, easier to reason about, and much simpler to test.

### [10 points] Question 1.2

Consider the following TypeScript function, which calculates the average price of all discounted products in a given inventory.

```ts
type Product = {
  name: string;
  price: number;
  discounted: boolean;
};

const getDiscountedProductAveragePrice = (inventory: Product[]): number => {
  let discountedPriceSum = 0;
  let discountedProductsCount = 0;

  for (const product of inventory) {
    if (product.discounted) {
      discountedPriceSum += product.price;
      discountedProductsCount++;
    }
  }

  if (discountedProductsCount === 0) {
    return 0;
  }

  return discountedPriceSum / discountedProductsCount;
};
```

This function uses an imperative approach with loops and conditional statements.

Refactor the function `getDiscountedProductAveragePrice` to adhere to the Functional Programming paradigm. Utilize the built-in array methods `map`, `filter`, and `reduce` to achieve the same functionality without explicit iteration and conditional checks.
Write the new function under the name `getDiscountedProductAveragePriceFP`.

**Important**: the new function should have the same signature.

**Note**: there are no tests for this question, and it will not be executed. The task here is to write the code in a functional way.

************ YA ANSWER *************
```ts
const getDiscountedProductAveragePriceFP = (inventory: Product[]): number => {
    // YA- Use filter to create a new array containing only products with discounted: true
    const discountedProducts = inventory.filter(p => p.discounted);
    
    // YA- Use a ternary operator to handle the empty array case and prevent division by zero
    return discountedProducts.length === 0 
        ? 0 
        : discountedProducts
            // YA- Map each product object to its price (number)
            .map(p => p.price)
            // YA- Reduce the array of prices into a single sum, starting from 0
            .reduce((acc, curr) => acc + curr, 0) / discountedProducts.length;
};
```
### [18 points] Question 1.3

Write the most general type for each expression, using type variables where applicable.
Guidelines:

- Arrays must be homogeneous.
- Arithmetic operations must be performed on numbers.
- Use generics where possible.
- Avoid using `any`.

1. [3 points] `(x, y) => x.some(y)`
   **Type:** `<T>(x: T[], y: (val: T) => boolean) => boolean`

2. [3 points] `x => x.map(y => y * 2)`
   **Type:** `(x: number[]) => number[]`

3. [3 points] `(x, y) => x.filter(y)`
   **Type:** `<T>(x: T[], y: (val: T) => boolean) => T[]`

4. [3 points] `x => x.reduce((acc, cur) => acc + cur, 0)`
   **Type:** `(x: number[]) => number`

5. [3 points] `(x, y) => x ? y[0] : y[1]`
   **Type:** `<T>(x: boolean, y: T[]) => T`

6. [3 points] `(f,g) => x => f(g(x+1))`
   **Type:** `<T, U>(f: (arg: U) => T, g: (arg: number) => U) => (x: number) => T`
