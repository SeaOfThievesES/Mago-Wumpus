const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ping'
        });
    }

    async run(message, args) {
        message.delete();
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! La latencia es de ${m.createdTimestamp - message.createdTimestamp}ms. La latencia de la API es de ${Math.round(this.bot.ping)}ms`);
    }
}