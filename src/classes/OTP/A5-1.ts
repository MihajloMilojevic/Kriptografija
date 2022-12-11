import { table } from "console";
import { OTP } from "./otp";

export class A5_1 {
	public static generateKey(length: number) {
		let x = OTP.generateKey(19);
		let y = OTP.generateKey(22);
		let z = OTP.generateKey(23);
		let t = [];
		let s: number[] = [];
		t.push({
			t: 0,
			x: [...x],
			y: [...y],
			z: [...z],
			s: []
		})
		
		console.log("takt: ", 0);
		console.table({
			x: Object.fromEntries(x.map((v, i) => ([i, v]))),
			y: Object.fromEntries(y.map((v, i) => ([i, v]))),
			z: Object.fromEntries(z.map((v, i) => ([i, v]))),
			s: Object.fromEntries(s.map((v, i) => ([i, v])))
		});
		for(let i = 1; i <= length; i++) {
			let m = (x[8] + y[10] + z[10]) > 1 ? 1 : 0;
			let res = x[18] ^ y[21] ^ z[22];
			s.push(res);
			if(x[8] === m) {
				let newBit = x[18] ^ x[17] ^ x[16] ^ x[13];
				x.unshift(newBit);
				x.pop();
			}
			if(y[10] === m) {
				let newBit = y[21] ^ y[22];
				y.unshift(newBit);
				y.pop();
			}
			if(z[10] === m) {
				let newBit = z[22] ^ z[21] ^ z[20];
				z.unshift(newBit);
				z.pop();
			}
			t.push({
				t: i,
				x: [...x],
				y: [...y],
				z: [...z],
				s: [...s]
			})
			console.log("takt: ", i);
			console.table({
				x: Object.fromEntries(x.map((v, i) => ([i, v]))),
				y: Object.fromEntries(y.map((v, i) => ([i, v]))),
				z: Object.fromEntries(z.map((v, i) => ([i, v]))),
				s: Object.fromEntries(s.map((v, i) => ([i, v])))
			});
		}
		// console.table(t);
		return s;
	}
}