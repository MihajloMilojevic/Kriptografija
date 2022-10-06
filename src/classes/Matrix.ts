export class Matrix<T> {
    private matrix: T[][];

    constructor(matrix: T[][]) {
        this.Matrix = matrix;
        this.matrix = matrix;
    }
    get Matrix() {
        return this.matrix;
    }
    set Matrix(matrix: T[][]) {
        if(matrix.length === 0) throw new Error("Matrix must have rows");
        if(matrix[0].length === 0) throw new Error("Matrix must have columns");
        if(matrix.some(row => row.length !== matrix[0].length)) throw new Error("All rows must have same number of columns");
        this.matrix = matrix;
    }
    public determinant(): number {
        if(typeof this.matrix[0][0] !== "number") throw new Error("Only number matrices determinant can be calculated");
        return Matrix.determinant(<Matrix<number>>this);
    }
    public multiply(value: number): Matrix<number>;
    public multiply(value: Matrix<number>): Matrix<number>;
    public multiply(value: any): Matrix<number> {
        if(!(this instanceof Matrix<number>)) throw new Error("Only number matrices can be multiplied");
        return Matrix.multiply(<Matrix<number>>this, value);
    }
    public add(value: number): Matrix<number>;
    public add(value: Matrix<number>): Matrix<number>;
    public add(value: any): Matrix<number> {
        if(!(this instanceof Matrix<number>)) throw new Error("Only number matrices can be added");
        return Matrix.add(<Matrix<number>>this, value);
    }
    public substract(value: number): Matrix<number>;
    public substract(value: Matrix<number>): Matrix<number>;
    public substract(value: any): Matrix<number> {
        if(!(this instanceof Matrix<number>)) throw new Error("Only number matrices can be substracted");
        return Matrix.substract(<Matrix<number>>this, value);
    }
    public transponse(): Matrix<T> {
        return Matrix.transponse(this);
    }
    public invert(): Matrix<T> {
        if(!(this instanceof Matrix<number>)) throw new Error("Only number matrices can be inverted");
        return <Matrix<T>>Matrix.invert(<Matrix<number>>this);
    }
    public swapRow(row1: number, row2: number): Matrix<T> {
        return Matrix.swapRow(this, row1, row2);
    }
    public swapColumn(col1: number, col2: number): Matrix<T> {
        return Matrix.swapColumn(this, col1, col2);
    }
    public static copy(matrix: Matrix<any>): Matrix<any> {
        return matrix.multiply(1);
    }
    public static from(matrix: any[][]): Matrix<any> {
        return new Matrix(matrix);
    }
    public static createMatrixArray(n: number, m: number, defaultValue?: any): any[][] {
        if(n <= 0 || m <= 0) throw new Error("Number of rows and colimns must be positive integer.")
        const row = new Array(m);
        for (let i = 0; i < m; i++) row[i] = (defaultValue ? defaultValue : null);
        const matrix = new Array(n);
        for (let i = 0; i < n; i++) matrix[i] = [...row];
        return matrix;
    }
    public static determinant(mat: Matrix<number>): number {
        if(typeof mat.matrix[0][0] !== "number") throw new Error("Only number matrices determinant can be calculated");
        let d = 0;
        const n = mat.matrix.length;
        const m = mat.matrix[0].length;
        if(n !== m) throw new Error("Only square matrices can have determinants")
        if(n === 1) {
            return mat.matrix[0][0];
        }
        if(n === 2) {
            return (mat.matrix[0][0] * <number>mat.matrix[1][1] - <number>mat.matrix[0][1] * <number>mat.matrix[1][0])
        }
        for(let k = 0; k < m; k++) {
            
            let newDet = Matrix.removeRowAndColumn(mat, 0, k)//.determinant();
            d += (k % 2 === 0 ? 1 : -1) * <number>mat.matrix[0][k] * newDet.determinant();;
        }
        return d;
    }
    public static multiply(mat: Matrix<number>, value: number): Matrix<number>;
    public static multiply(mat: Matrix<number>, value: Matrix<number>): Matrix<number>;
    public static multiply(mat: Matrix<number>, value: any): Matrix<number> {
        if(!(mat instanceof Matrix<number>)) throw new Error("Only number matrices can be multiplied");
        const n = mat.matrix.length;
        const m = mat.matrix[0].length;
        let res = Array(n);
        if(typeof value === "number") {
            for(let i = 0; i < mat.matrix.length; i++) {
                const row = Array(m);
                for(let j = 0; j < mat.matrix[0].length; j++)
                    row[j] = <number>mat.matrix[i][j] * value;
                res[i] = row;
            }
        }
        else if(value instanceof Matrix<number>) {
            const n2 = value.Matrix.length;
            const m2 = value.Matrix[0].length;
            if(m !== n2) throw new Error("Second matrix must have same number of rows as first has columns");
            res = Array(n);
            for(let i = 0; i < n; i++) {
                const row = Array(m2);
                for(let j = 0; j < m2; j++) 
                    row[j] = Matrix.multiplyRowWithColumn(<Matrix<number>>mat, i, value, j);
                res[i] = row;
            }
        }
        return new Matrix(res);
    }
    public static add(mat: Matrix<number>, value: number): Matrix<number>;
    public static add(mat: Matrix<number>, value: Matrix<number>): Matrix<number>;
    public static add(mat: Matrix<number>, value: any): Matrix<number> {
        if(!(mat instanceof Matrix<number>)) throw new Error("Only number matrices can be added");
        const n = mat.matrix.length;
        const m = mat.matrix[0].length;
        let res = Array(n);
        if(typeof value === "number") {
            for(let i = 0; i < mat.matrix.length; i++) {
                const row = Array(m);
                for(let j = 0; j < mat.matrix[0].length; j++)
                    row[j] = <number>mat.matrix[i][j] + value;
                res[i] = row;
            }
        }
        else if(value instanceof Matrix<number>) {
            const n2 = value.Matrix.length;
            const m2 = value.Matrix[0].length;
            if(n !== n2 || m !== m2) throw new Error("Matrices must have same dimensions");
            for(let i = 0; i < n; i++) {
                const row = Array(m);
                for(let j = 0; j < m; j++) 
                    row[j] = mat.matrix[i][j] + value.Matrix[i][j];
                res[i] = row;
            }
        }
        return new Matrix(res);
    }
    public static substract(mat: Matrix<number>, value: number): Matrix<number>;
    public static substract(mat: Matrix<number>, value: Matrix<number>): Matrix<number>;
    public static substract(mat: Matrix<number>, value: any): Matrix<number> {
        if(!(mat instanceof Matrix<number>)) throw new Error("Only number matrices can be substracted");
        const n = mat.matrix.length;
        const m = mat.matrix[0].length;
        let res = Array(n);
        if(typeof value === "number") {
            for(let i = 0; i < mat.matrix.length; i++) {
                const row = Array(m);
                for(let j = 0; j < mat.matrix[0].length; j++)
                    row[j] = <number>mat.matrix[i][j] - value;
                res[i] = row;
            }
        }
        else if(value instanceof Matrix<number>) {
            const n2 = value.Matrix.length;
            const m2 = value.Matrix[0].length;
            if(n !== n2 || m !== m2) throw new Error("Matrices must have same dimensions");
            for(let i = 0; i < n; i++) {
                const row = Array(m);
                for(let j = 0; j < m; j++) 
                    row[j] = <number>mat.matrix[i][j] - value.Matrix[i][j];
                res[i] = row;
            }
        }
        return new Matrix(res);
    }
    public static multiplyRowWithColumn(matA: Matrix<number>, row: number, matB: Matrix<number>, col: number): number {
        const n = matB.Matrix.length;
        let S = 0;
        for(let i = 0; i < n; i++) 
            S += matA.Matrix[row][i] * matB.Matrix[i][col];
        return S;
    }
    public static removeRowAndColumn(mat: Matrix<any>, row: number, col: number): Matrix<any> {
        const n = mat.Matrix.length;
        const m = mat.Matrix[0].length;
        let r = 0, c = 0;
        const newMatrix = Matrix.createMatrixArray(n - 1, m - 1);
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                if(i === row || j === col) continue;
                newMatrix[r][c] = mat.Matrix[i][j];
                c++;
                if(c === m - 1) {
                    c = 0;
                    r++;
                }
            }
        }
        return new Matrix(newMatrix);
    }
    public static transponse(mat: Matrix<any>): Matrix<any> {
        const n = mat.Matrix.length;
        const m = mat.Matrix[0].length;
        let res = Array(m);
        for(let j = 0; j < m; j++) {
            let row = Array(n);
            for(let i = 0; i < n; i++) {
                row[i] = mat.Matrix[i][j];
            }
            res[j] = row;
        }
        return new Matrix(res)
    }
    public static invert(mat: Matrix<number>): Matrix<number> {
        if(mat.determinant() === 0) throw new Error("Matrix is non-invertible");
        
        const n = mat.Matrix.length;
        const m = mat.Matrix[0].length;
        if(n !== m) throw new Error("Matrix is non-invertible");
        let matT = mat.transponse();
        let res = Array(n);
        for(let i = 0; i < n; i++) {
            let row = Array(m);
            for(let j = 0; j < m; j++) {
                row[j] = Math.pow(-1, i + j) * Matrix.removeRowAndColumn(matT, i, j).determinant();
            }
            res[i] = row;
        }
        const adjMat = new Matrix<number>(res);
        return adjMat.multiply(1.0 / mat.determinant());
    }
    public static swapRow(mat: Matrix<any>, row1: number, row2: number): Matrix<any> {
        const n = mat.Matrix.length;
        if(row1 >= n || row2 >= n) throw new Error("Invalid row number");
        const res = Matrix.copy(mat);
        const rowT = res.Matrix[row1];
        res.Matrix[row1] = res.Matrix[row2];
        res.Matrix[row2] = rowT;
        return res;
    }
    public static swapColumn(mat: Matrix<any>, col1: number, col2: number): Matrix<any> {
        const n = mat.Matrix.length;
        const m = mat.Matrix[0].length;
        if(col1 >= m || col2 >= m) throw new Error("Invalid column number");
        const res = Matrix.copy(mat);
        for(let i = 0; i < n; i ++) {
            const colT = res.Matrix[i][col1];
            res.Matrix[i][col1] = res.Matrix[i][col2];
            res.Matrix[i][col2] = colT;
        }
        return res;
    }
}