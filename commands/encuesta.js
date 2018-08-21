const Discord = require("discord.js");
const { Command } = require("../index");
const config = require("../config/botconfig.json");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'encuesta'
        });
    }

    async run(message, args) {
        message.delete();
        let pregunta = args.join(" ");

        if (message.author.id !== config.ownerID){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
        }
        let encuestaEmbed = new Discord.RichEmbed()
        .setTitle("¡Nueva encuesta!")
        .setDescription(pregunta)
        .setFooter(`Reacciona para votar | ${message.guild.name}`)
        .setTimestamp();

        let noticiasCanal = message.guild.channels.find(`name`, "noticias");
        let mensaje = await noticiasCanal.send(encuestaEmbed);
        
        await mensaje.react(`✅`);
        await mensaje.react(`❎`);
    }
}