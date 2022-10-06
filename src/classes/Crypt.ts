export class Crypt {
    private message: string = "";
    constructor(message: string) {
        this.message = message;
    }
    set Message(value: string) {
        this.message = value;
    }
    
}