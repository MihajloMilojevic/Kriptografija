import { Matrix } from "../Matrix";

export class HillCipher {
	public static encrypt(message: string, A: Matrix<number>): string {
		message = message.toUpperCase();
		const n = A.RowNum;
		const p = Array(message.length / n);
		const c = Array(message.length / n);
		// put block of length n into string (char) matrix nx1
		for(let i = 0; i < message.length; i += n) {
			p[i / n] = Array(n);
			for(let j = 0; j < n; j++)
				p[i / n][j] = [message[i + j]];
		}
		// console.log(JSON.stringify(p, null, 2));
		console.table(p)
		// transform chars to coresponding numbers in aphabet
		for(let i = 0; i < message.length / n; i++)
			for (let j = 0; j < n; j++)
				p[i][j] = [p[i][j][0].charCodeAt(0) - "A".charCodeAt(0)];
		console.table(p)
		// multiply Ap[i] to get c[i]
		for(let i = 0; i < message.length / n; i++) 
			c[i] = A.multiply(new Matrix<number>(p[i])).mod(26).Matrix;
			
		console.table(c);
		// transform nums to chars
		for(let i = 0; i < message.length / n; i++) 
			for (let j = 0; j < n; j++)
				c[i][j][0] = String.fromCharCode(c[i][j][0] + "A".charCodeAt(0));
		console.table(c);
		let cipher = [];
		for(let i = 0; i < message.length / n; i++) {
			let pi = [];
			for(let j = 0; j < n; j++)
				pi.push(c[i][j][0]);
			cipher.push(pi.join(""));
		}
		return cipher.join("");
	}
}