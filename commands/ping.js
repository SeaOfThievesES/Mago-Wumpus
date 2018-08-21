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
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
}