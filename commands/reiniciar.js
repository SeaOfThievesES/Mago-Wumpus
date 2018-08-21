const magoWumpus = require("../index");
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'reiniciar'
        });
    }

    async run(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) return message.reply("¡No puedes hacer eso!");
        message.channel.send('Reiniciando comandos...')
        magoWumpus.reloadCmds()
            .then(msg => Client.destroy())
            .then(() => Client.login(token.token));
    }
}