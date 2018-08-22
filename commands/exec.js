const config = require("../config/botconfig.json");
var exec = require('child_process').exec;
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { });
    }

    async run(message, args) {
        if (message.author.id !== config.ownerID) return;
        const code = args.join(" ");
        let executed = exec(code, function (error, stdout, stderr) {
            message.channel.send("STDOUT:");
            message.channel.send('```js\n' + stdout + '```');
            message.channel.send("STDERR:");
            if(stderr) {
                message.channel.send('```js\n' + stderr + '```');
            }
        });
    }
}