const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) =>
{
    message.delete();
    let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let lvlAdv = advertencias[wUser.id].advertencias;

    message.reply(`${wUser} tiene ${lvlAdv} advertencias.`);
    

}
module.exports.help = {
    name: "ver"
}