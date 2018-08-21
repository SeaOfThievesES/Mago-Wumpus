class Command {
    constructor(bot, file, prefix, options) {
        this.name = options.name;
        this.bot = bot;
        this.prefix = prefix;
    }

    async run() {

    }
}

module.exports = Command;
