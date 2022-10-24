import {ColumnTransposition, Matrix} from "./classes";
import { HillCipher } from "./classes/Substitution/HillCipher";
const a = [
    [-1, 1.5],
    [1, -1]
]
const b = [
    [0, 4, 0, 7, 4, 1],
    [0, 8, 0, 1, 8, 7],
    [9, 6, 8, 0, 5, 4],
    [8, 7, 5, 7, 3, 4],
    [0, 9, 1, 6, 1, 3],
    [9, 4, 3, 4, 5, 4],
]
const matA = new Matrix(a);
const matB = new Matrix(b);
// console.log(matA.multiply(matB).determinant());
// console.log(matB.determinant());
// console.log(matA.invert().Matrix);
// console.log(matB.swapColumn(0, 2).Matrix);
console.log(HillCipher.encrypt("ZASTITAXINFORMACIONIHXSISTEMAX", matB));
console.log("CIRDPDJXXZCPEAJCOTNBFAZUBNKFEA" === "CIRDPDJXXZCPEAJCOTNBFAZUBNKFEA")

