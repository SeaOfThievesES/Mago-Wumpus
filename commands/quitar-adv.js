const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));
const { Command } = require("../index");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'quitar-adv'
        });
    }

    async run(message, args) {
        message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!wUser) return message.reply("Especifíca un usuario");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
        let razon = args.join(" ").slice(22);

       
        
        if(!advertencias[wUser.id]) {
            message.channel.send(`¡${wUser} no tiene advertencias!`);

            advertencias[wUser.id] = {
            advertencias: 0
            }; return;            
        }
        
        fs.writeFile("./storage/advertencias.json", JSON.stringify(advertencias), (err) => {
            if(err) console.log(err)
            
        });

        if(advertencias[wUser.id].advertencias === 0){
            return message.channel.send(`¡${wUser} no tiene advertencias!`);
        }
        else {
            advertencias[wUser.id] = {
            advertencias: advertencias[wUser.id] - parseInt(1)
            };
        }
        
        fs.writeFile("./storage/advertencias.json", JSON.stringify(advertencias), (err) => {
            if(err) console.log(err)
            
        });       
        

        let advertenciaEmbed = new Discord.RichEmbed()
        .setDescription("Advertencias")
        .setAuthor(message.author.username)
        .setColor("7289da")
        .addField("Usuario des-advertido", wUser)
        .addField("Cantidad de advertencias", advertencias[wUser.id].advertencias)
        .addField("Razón", razon);

        let canalAdv = message.guild.channels.find(`name`, "registro");
        if(!canalAdv) message.reply("¡No hay canal de advertencias!")
        canalAdv.send(advertenciaEmbed);
        

    }
}