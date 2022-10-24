
export class CesarCipher {
    public static encrypt(message: string, rotation: number): string {
        const cipher = Array(message.length);
        for(let i = 0; i < message.length; i++) 
            cipher[i] = CesarCipher.moveLetter(message[i], rotation);
        return cipher.join("");
    }

    public static decrypt(cipher: string, rotation: number): string {
        const message = Array(cipher.length);
        for(let i = 0; i < cipher.length; i++) 
            message[i] = CesarCipher.moveLetter(cipher[i], -rotation);
        return message.join("");
    }

    private static moveLetter(letter: string, rotation: number): string {
        return String.fromCharCode((letter.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + rotation + 26) % 26 + "A".charCodeAt(0));
    }
}