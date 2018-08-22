class Command {
    constructor(bot, file, prefix, options) {
        this.name = options.name ? options.name : file.split(".")[0];
        this.bot = bot;
        this.prefix = prefix;
    }

    async run() {

    }
}

module.exports = Command;
