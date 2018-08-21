const Discord = require("discord.js");
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'clear'
        });
    }

    async run(message, args) {
        message.delete();
        let author = message.member;
        let founderRole = message.guild.roles.find(`name`, "LKC Founder");

    
        if(!author.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puede ejecutar ese comando!");
        if(author.hasPermission("MANAGE_MESSAGES")){
            if(!args[0]) return message.channel.send("¡Debes poner cuántos mensages quieres que elimine!");
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`Eliminados ${args[0]} mensajes`).then(msg => msg.delete(5000));
            }); 
        }
    }
}