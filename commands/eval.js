const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const config = require("../config/botconfig.json");
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'eval'
        });
    }

    async run(message, args) {
        //message.delete();
        if (message.author.id !== config.ownerID) return;
        try {
        const code = args[0];
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"x1"});
        } catch (err) {
        message.channel.send(`\ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
        }
    }

    clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
}