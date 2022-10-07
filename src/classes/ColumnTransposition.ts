import { Matrix } from "./Matrix";

export class ColumnTransposition {
    public static encrypt(message: string, n: number, m: number): string;
    public static encrypt(message: string, n: number, m: number, keyWord: string): string;
    public static encrypt(message: any, n: any, m: any, keyWord?: any): string {
        if(message.length < n * m) throw new Error(`Matrix ${n}x${m} is insuficient to crypt this massage`);
        let matArray = Matrix.createMatrixArray(n, m, "x");
        let k = 0;
        for(let i = 0; i < n; i++)
            for(let j = 0; j < m; j++)
                matArray[i][j] = message[k++];
        let mat = new Matrix(matArray);
        if(keyWord && typeof keyWord === "string") {
            if(keyWord.length !== m) throw new Error("Lenght of key word and number of columns must be same");
            const currentOrder = Array(m);
            for(let i = 0; i < m; i++) currentOrder[i] = i;
            const endOrder = keyWord
                .toLowerCase()
                .split("")
                .map((char, index) => ({char, index}))
                .sort((a, b) => a.char > b.char ? 1: -1)
                .map(({index}) => index);
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
}