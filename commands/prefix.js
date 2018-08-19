const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) =>
{
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
    if(!args[0]) return message.reply(`¡Pon el prefijo que quieras que tenga en este servidor! Uso: ${prefix}prefix <el prefijo que desees>`);

    let prefixes = JSON.parse(fs.readFileSync("./config/prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    }
    fs.writeFile("./config/prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`Prefijo actualizado a ${args[0]}`);
}

module.exports.help = {
    name: "prefix"
}