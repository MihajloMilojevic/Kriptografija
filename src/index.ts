import {ColumnTransposition, Matrix} from "./classes";
const a = [
    [-1, 1.5],
    [1, -1]
]
const b = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
]
const matA = new Matrix(a);
const matB = new Matrix(b);
// console.log(matA.multiply(matB).determinant());
// console.log(matB.determinant());
// console.log(matA.invert().Matrix);
// console.log(matB.swapColumn(0, 2).Matrix);
console.log(ColumnTransposition.encrypt("UNIVERZITETSINGIDUNUM", 3, 7));