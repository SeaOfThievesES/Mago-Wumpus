const config = require("../config/botconfig.json");
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { });
    }

    async run(message, args) {
        if (message.author.id !== config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            evaled.then(function(result) {
                if (typeof evaled !== "string")
                    require("util").inspect(evaled);

                message.channel.send(clean(evaled), {code:"x1"});
            })
        } catch (err) {
            message.channel.send(`\ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
        }
    }
}

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
