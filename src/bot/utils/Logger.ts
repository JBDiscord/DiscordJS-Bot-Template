export class Logger {
    private prefix: String = ""
    private debugMode: boolean = false

    constructor(debugMode: boolean, prefix?: String) {
        prefix = this.prefix
        debugMode = this.debugMode
    }

    public Debug(text: String) {
        if (this.debugMode == true) { console.debug(text) }
    }
    public Error(text: String) {
        console.error(text)
    }
    public Info(text: String) {
        console.log(text)
    }
}