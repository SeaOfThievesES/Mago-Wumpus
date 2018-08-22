const magoWumpus = require("../index");
const { Command } = require("../index");
const config = require("../config/botconfig.json");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { });
    }

    async run(message, args) {
        if (message.author.id !== config.ownerID){
        if (message.member.hasPermission("ADMINISTRATOR")) return message.reply("¡No puedes hacer eso!");
        }
        message.channel.send('Reiniciando comandos...')
        magoWumpus.reloadCmds();
        magoWumpus.reloadEvents()
            .then(msg => this.bot.destroy())
            .then(() => this.bot.login(token.token));
    }
}