
export class OTP {
	public static generateKey(length: number) {
		const key = Array(length);
		for(let i = 0; i < length; i++) 
			key[i] = Math.round(Math.random());
		return key;
	}
	public static encrypt(message: string) {
		const plainText = message.split('').map(char => {
			let binaryString = char.charCodeAt(0).toString(2);
			let fill = (8 - binaryString.length);
			while(fill--) binaryString = "0" + binaryString;
			return binaryString.split('').map(bit => parseInt(bit));
		}).flat();
		console.log(plainText.length, message.length, plainText.length / message.length); 
		
		const key = OTP.generateKey(plainText.length);
		let res = plainText.map((bit, i) => bit ^ key[i]);
		let resCopy = [...res];
		let res8 = [];
		while(res.length) {
			res8.push(res.splice(0, 8));
		}
		res = resCopy;
		const resS = res8.map(arr => String.fromCharCode(parseInt(arr.join(""), 2))).join("");
		console.log(resS);
		let i = 0;
		while (plainText.length) {
			console.log(message[i], i++);
			console.table({plainText: plainText.splice(0, 8), key: key.splice(0, 8), res: res.splice(0, 8)});
		}
		return resS;
	}

}

// ö]LXÚ«´«g¶0☺wWDÂ«É5♀7øJ.f
// Z 0
// plainText 0 1 0 1 1 0 1 0
//    key    1 0 1 0 1 1 0 0
//    res    1 1 1 1 0 1 1 0
// a 1
// plainText 0 1 1 0 0 0 0 1
//    key    0 0 1 1 1 1 0 0
//    res    0 1 0 1 1 1 0 1
// s 2
// plainText 0 1 1 1 0 0 1 1
//    key    0 0 1 1 1 1 1 1
//    res    0 1 0 0 1 1 0 0
// t 3
// plainText 0 1 1 1 0 1 0 0
//    key    0 0 1 0 1 1 0 0
//    res    0 1 0 1 1 0 0 0
// i 4
// plainText 0 1 1 0 1 0 0 1
//    key    1 0 1 1 0 0 1 1
//    res    1 1 0 1 1 0 1 0
// t 5
// plainText 0 1 1 1 0 1 0 0
//    key    1 1 0 1 1 1 1 1
//    res    1 0 1 0 1 0 1 1
// a 6
// plainText 0 1 1 0 0 0 0 1
//    key    1 1 0 1 0 1 0 1
//    res    1 0 1 1 0 1 0 0
//   7
// plainText 0 0 1 0 0 0 0 0
//    key    1 0 0 0 1 0 1 1
//    res    1 0 1 0 1 0 1 1
// I 8
// plainText 0 1 0 0 1 0 0 1
//    key    0 0 1 0 1 1 1 0
//    res    0 1 1 0 0 1 1 1
// n 9
// plainText 0 1 1 0 1 1 1 0
//    key    1 1 0 1 1 0 0 0
//    res    1 0 1 1 0 1 1 0
// f 10
// plainText 0 1 1 0 0 1 1 0
//    key    0 1 0 1 0 1 1 0
//    res    0 0 1 1 0 0 0 0
// o 11
// plainText 0 1 1 0 1 1 1 1
//    key    0 1 1 0 1 1 1 0
//    res    0 0 0 0 0 0 0 1
// r 12
// plainText 0 1 1 1 0 0 1 0
//    key    0 0 0 0 0 1 0 1
//    res    0 1 1 1 0 1 1 1
// m 13
// plainText 0 1 1 0 1 1 0 1
//    key    0 0 1 1 1 0 1 0
//    res    0 1 0 1 0 1 1 1
// a 14
// plainText 0 1 1 0 0 0 0 1
//    key    0 0 1 0 0 1 0 1
//    res    0 1 0 0 0 1 0 0
// c 15
// plainText 0 1 1 0 0 0 1 1
//    key    1 1 1 0 0 1 0 1
//    res    1 0 0 0 0 1 1 0
// i 16
// plainText 0 1 1 0 1 0 0 1
//    key    1 0 1 0 1 0 1 1
//    res    1 1 0 0 0 0 1 0
// o 17
// plainText 0 1 1 0 1 1 1 1
//    key    1 1 0 0 0 1 0 0
//    res    1 0 1 0 1 0 1 1
// n 18
// plainText 0 1 1 0 1 1 1 0
//    key    1 1 1 0 1 1 0 1
//    res    1 0 0 0 0 0 1 1
// i 19
// plainText 0 1 1 0 1 0 0 1
//    key    1 0 1 0 0 0 0 0
//    res    1 1 0 0 1 0 0 1
// h 20
// plainText 0 1 1 0 1 0 0 0
//    key    0 1 0 1 1 1 0 1
//    res    0 0 1 1 0 1 0 1
//   21
// plainText 0 0 1 0 0 0 0 0
//    key    0 0 1 0 1 1 0 0
//    res    0 0 0 0 1 1 0 0
// S 22
// plainText 0 1 0 1 0 0 1 1
//    key    0 1 1 0 0 1 0 0
//    res    0 0 1 1 0 1 1 1
// i 23
// plainText 0 1 1 0 1 0 0 1
//    key    1 1 1 0 0 1 1 0
//    res    1 0 0 0 1 1 1 1
// s 24
// plainText 0 1 1 1 0 0 1 1
//    key    1 1 1 1 0 1 0 1
//    res    1 0 0 0 0 1 1 0
// t 25
// plainText 0 1 1 1 0 1 0 0
//    key    1 0 0 0 1 1 0 0
//    res    1 1 1 1 1 0 0 0
// e 26
// plainText 0 1 1 0 0 1 0 1
//    key    0 0 1 0 1 1 1 1
//    res    0 1 0 0 1 0 1 0
// m 27
// plainText 0 1 1 0 1 1 0 1
//    key    0 1 0 0 0 0 1 1
//    res    0 0 1 0 1 1 1 0
// a 28
// plainText 0 1 1 0 0 0 0 1
//    key    0 0 0 0 0 1 1 1
//    res    0 1 1 0 0 1 1 0