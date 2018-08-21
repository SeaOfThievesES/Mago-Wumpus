const fs = require("fs");
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ver'
        });
    }

    async run(message, args) {
        message.delete();
        let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if(!advertencias[wUser.id]) advertencias[wUser.id] = {
	    advertencias: 0
	};


        let lvlAdv = advertencias[wUser.id].advertencias;

        message.reply(`${wUser} tiene ${lvlAdv} advertencias.`);
    }
}
