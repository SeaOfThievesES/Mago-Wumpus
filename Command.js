class Command {
    constructor(bot, file, prefix) {
        this.name = this.name.toLowerCase();
        this.bot = bot;
        this.prefix = prefix;
    }

    async run() {

    }
}

module.exports = Command;