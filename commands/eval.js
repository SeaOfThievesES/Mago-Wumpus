const config = require("../config/botconfig.json");
var fs = require('fs');
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { });
    }

    async run(message, args) {
        if (message.author.id !== config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = await eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const mensaje = clean(evaled);

            if (mensaje.length > 2000) {
                if (fs.exists('./output') == true) {
                    fs.unlink('./output', function(err) {
                        if (err) throw err;
                    });
                }
                fs.writeFile("./output", mensaje, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    message.channel.send("El mensaje contiene mas de 2000 caracteres", {files: [{
                        attachement: './output',
                        name: 'output'
                    }]});
                });
            } else {
                message.channel.send(mensaje, {code:"x1"});
            }
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
