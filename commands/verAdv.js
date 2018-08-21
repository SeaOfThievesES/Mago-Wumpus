const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const { Command } = require("../index");

<<<<<<< HEAD
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ver'
        });
    }
=======
module.exports.run = async (bot, message, args) =>
{
    message.delete();
    let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    
    if(!advertencias[wUser.id]) advertencias[wUser.id] = {
        advertencias: 0
    };
    
    let lvlAdv = advertencias[wUser.id].advertencias;
>>>>>>> 3b65753488ee4facdc04982771c953a7b8edb493

    async run(message, args) {
        message.delete();
        let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let lvlAdv = advertencias[wUser.id].advertencias;

        message.reply(`${wUser} tiene ${lvlAdv} advertencias.`);
    }
}