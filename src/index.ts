import {Matrix} from "./classes";
const a = [
    [-1, 1.5],
    [1, -1]
]
const b = [
    [1, 0, 5],
    [2, 1, 6],
    [3, 4, 0]
]
const matA = new Matrix(a);
const matB = new Matrix(b);
// console.log(matA.multiply(matB).determinant());
console.log(matB.determinant());
console.log(matA.invert().Matrix);