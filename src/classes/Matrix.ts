export class Matrix<T> {
    private matrix: T[][];

    constructor(matrix: T[][]) {
        if(matrix.length === 0) throw new Error("Matrix must have rows");
        if(matrix[0].length === 0) throw new Error("Matrix must have columns");
        if(matrix.some(row => row.length !== matrix[0].length)) throw new Error("All rows must have same number of columns");
        this.matrix = matrix;
    }
    get Matrix() {
        return this.matrix;
    }
    set Matrix(value: T[][]) {
        this.matrix = value;
    }
    public determinant(): number {
        if(typeof this.matrix[0][0] !== "number") throw new Error("Only number matrices determinant can be calculated");
        let d = 0;
        const n = this.matrix.length;
        const m = this.matrix[0].length;
        if(n !== m) throw new Error("Only square matrices ")
        if(n === 1) {
            return this.matrix[0][0];
        }
        if(n === 2) {
            return (this.matrix[0][0] * <number>this.matrix[1][1] - <number>this.matrix[0][1] * <number>this.matrix[1][0])
        }
        for(let k = 0; k < m; k++) {
            const newMatrix = Matrix.createMatrixArray(n - 1, m - 1);
            let r = 0, c = 0;
            for(let i = 1; i < n; i++) {
                for(let j = 0; j < m; j++) {
                    if(j == k) continue;
                    newMatrix[r][c] = this.matrix[i][j];
                    c++;
                    if(c === m - 1) {
                        c = 0;
                        r++;
                    }
                }
            }
            let newDet = (new Matrix(newMatrix)).determinant();
            d += (k % 2 === 0 ? 1 : -1) * <number>this.matrix[0][k] * newDet;
        }
        return d;
    }
    public multiply(value: number): Matrix<number> {
        if(typeof this.matrix[0][0] !== "number") throw new Error("Only number matrices can be multiplied");
        const res = [];
        for(let i = 0; i < this.matrix.length; i++) {
            const row = [];
            for(let j = 0; j < this.matrix[0].length; j++)
                row.push(<number>this.matrix[i][j] * value);
            res.push(row);
        }
        return new Matrix(res);
    }
    public add(value: number): Matrix<number>;
    public add(value: Matrix<number>): Matrix<number> {
        if(value instanceof Matrix) {
            return new Matrix([[]])
        }
        else {
            if(typeof this.matrix[0][0] !== "number") throw new Error("Only number matrices can be added");
            const res = [];
            for(let i = 0; i < this.matrix.length; i++) {
                const row = [];
                for(let j = 0; j < this.matrix[0].length; j++)
                    row.push(<number>this.matrix[i][j] + value);
                res.push(row);
            }
            return new Matrix(res);
        }
    }
   
    public substract(value: number): Matrix<number> {
        if(typeof this.matrix[0][0] !== "number") throw new Error("Only number matrices can be substracted");
        const res = [];
        for(let i = 0; i < this.matrix.length; i++) {
            const row = [];
            for(let j = 0; j < this.matrix[0].length; j++)
                row.push(<number>this.matrix[i][j] - value);
            res.push(row);
        }
        return new Matrix(res);
    }

    static createMatrixArray(n: number, m: number) {
        if(n <= 0 || m <= 0) throw new Error("Number of rows and colimns must be positive integer.")
        const row = new Array(m);
        for (let i = 0; i < m; i++) row[i] = null;
        const matrix = new Array(n);
        for (let i = 0; i < n; i++) matrix[i] = [...row];
        return matrix;
    }
}