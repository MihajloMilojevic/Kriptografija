import { Matrix } from "../Matrix";

export class ColumnTransposition {
    
    public static encrypt(message: string, n: number, m: number): string;
    public static encrypt(message: string, n: number, m: number, keyWord: string): string;
    public static encrypt(message: string, n: number, m: number, order: number[]): string;
    public static encrypt(message: any, n: any, m: any, key?: any): string {
        if(message.length < n * m) throw new Error(`Matrix ${n}x${m} is insuficient to encrypt this massage`);
        let matArray = Matrix.createMatrixArray(n, m, "x");
        let k = 0;
        for(let i = 0; i < n; i++)
            for(let j = 0; j < m; j++)
                matArray[i][j] = message[k++];
        let mat = new Matrix(matArray);
        let endOrder: number[] = [];
        if(key) {
            if(typeof key === "string") {
                if(key.length !== m) throw new Error("Lenght of key word and number of columns must be same");
                endOrder = key
                    .toLowerCase()
                    .split("")
                    .map((char, index) => ({char, index}))
                    .sort((a, b) => a.char > b.char ? 1: -1)
                    .map(({index}) => index);
            }
            else if(Array.isArray(key)) {
                if(key.length !== m) throw new Error("Order array must be the same length as the number of columns");
                if(key.some(el => el < 0 || el >= m)) throw new Error("Invalid order indecies");
                if(key.length !== (new Set(key)).size) throw new Error("No duplicates allowed");
                endOrder = key;
            }
        }
        if(endOrder.length) {
            const currentOrder = Array(m);
            for(let i = 0; i < m; i++) currentOrder[i] = i;
            for(let i = 0; i < m - 1; i++) {
                let j = currentOrder.findIndex(ind => ind === endOrder[i]);
                const t = currentOrder[i];
                currentOrder[i] = currentOrder[j];
                currentOrder[j] = t;
                mat = mat.swapColumn(i, j);
            }
        }
        let cipher = Array(n * m);
        k = 0;
        for(let j = 0; j < m; j++)
            for(let i = 0; i < n; i++)
                cipher[k++] = mat.Matrix[i][j];
        return cipher.join("");
    }
    public static decrypt(cipher: string, n: number, m: number): string;
    public static decrypt(cipher: string, n: number, m: number, keyWord: string): string;
    public static decrypt(cipher: string, n: number, m: number, order: number[]): string;
    public static decrypt(cipher: any, n: any, m: any, key?: any): string {
        if(cipher.length < n * m) throw new Error(`Matrix ${n}x${m} is insuficient to decrypt this cipher`);
        let matArray = Matrix.createMatrixArray(n, m, "x");
        let k = 0;
        for(let j = 0; j < m; j++)
            for(let i = 0; i < n; i++)
                matArray[i][j] = cipher[k++];
        let mat = new Matrix(matArray);
        let currentOrder: number[] = [];
        if(key) {
            if(typeof key === "string") {
                if(key.length !== m) throw new Error("Lenght of key word and number of columns must be same");
                currentOrder = key
                    .toLowerCase()
                    .split("")
                    .map((char, index) => ({char, index}))
                    .sort((a, b) => a.char > b.char ? 1: -1)
                    .map(({index}) => index);
            }
            else if(Array.isArray(key)) {
                if(key.length !== m) throw new Error("Order array must be the same length as the number of columns");
                if(key.some(el => el < 0 || el >= m)) throw new Error("Invalid order indecies");
                if(key.length !== (new Set(key)).size) throw new Error("No duplicates allowed");
                currentOrder = key;
            }
        }
        if(currentOrder.length) {
            const endOrder = Array(m);
            for(let i = 0; i < m; i++) endOrder[i] = i;
            for(let i = 0; i < m - 1; i++) {
                let j = currentOrder.findIndex(ind => ind === endOrder[i]);
                const t = currentOrder[i];
                currentOrder[i] = currentOrder[j];
                currentOrder[j] = t;
                mat = mat.swapColumn(i, j);
            }
        }
        let message = Array(n * m);
        k = 0;
        for(let i = 0; i < n; i++)
            for(let j = 0; j < m; j++)
                message[k++] = mat.Matrix[i][j];
        return message.join("");
    }
}