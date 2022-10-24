import { CesarCipher } from "./CesarCipher";

export class VigenereCipher {
    public static encrypt(message: string, rotations: number[]): string {
        const cipher = Array(message.length);
        for(let i = 0; i < message.length; i++) 
            cipher[i] = CesarCipher.encrypt(message[i], rotations[i % rotations.length]);
        return cipher.join("");
    }

    public static decrypt(cipher: string, rotations: number[]): string {
        const message = Array(cipher.length);
        for(let i = 0; i < cipher.length; i++) 
            message[i] = CesarCipher.decrypt(cipher[i], rotations[i % rotations.length]);
        return message.join("");
    }
}