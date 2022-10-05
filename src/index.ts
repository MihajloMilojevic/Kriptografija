import {Matrix} from "./classes";
const m = [
    [1, 2, -3],
    [-4, 5, 6],
    [7, 8, -9]
]
const mat = new Matrix(m);
mat.multiply(2);
console.log(mat.Matrix);
console.log(mat.determinant());