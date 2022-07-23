export class Logger {
    prefix: String = ""

    constructor(prefix?: String) {
        prefix = this.prefix
    }

    public Debug(text: String) {
        console.debug(text)
    }
    public Error(text: String) {
        console.log(text)
    }
    public Info(text: String) {
        console.log(text)
    }
}