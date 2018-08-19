const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let advertencias = JSON.parse(fs.readFileSync("./storage/advertencias.json", "utf8"));

module.exports.run = async (bot, message, args) =>
{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.reply("Especifíca un usuario");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("¡No puedes hacer eso!");
    let razon = args.join(" ").slice(22);

    if(!advertencias[wUser.id]) advertencias[wUser.id] = {
        advertencias: 0
    };
    advertencias[wUser.id].advertencias++;

    fs.writeFile("./storage/advertencias.json", JSON.stringify(advertencias), (err) => {
        if(err) console.log(err)
        
    });

    let advertenciaEmbed = new Discord.RichEmbed()
    .setDescription("Advertencias")
    .setAuthor(message.author.username)
    .setColor("7289da")
    .addField("Usuario advertido", wUser)
    .addField("Cantidad de advertencias", advertencias[wUser.id].advertencias)
    .addField("Razón", razon);

    let canalAdv = message.guild.channels.find(`name`, "general");
    if(!canalAdv) message.reply("¡No hay canal de advertencias!")
    canalAdv.send(advertenciaEmbed);

    if(advertencias[wUser.id].advertencias == 2)
    {
        let rolMuteado = message.guild.roles.find(`name`, "Muteado");
        if(!rolMuteado) return message.reply("¡No he podido encontrar el rol de muteado!");

        let tiempoDeMute = "10s";
        await(wUser.addRole(rolMuteado.id));        
        message.channel.send(`${wUser} ha sido muteado por 10 minutos por tener 2 advertencias.`);
        
        setTimeout(function(){
            wUser.removeRole(rolMuteado.id)
            message.channel.send(`${wUser} ha sido desmuteado.`)
        }, ms(tiempoDeMute));
    }
    if(advertencias[wUser.id].advertencias == 3)
    {
        message.guild.member(wUser).kick(razon);
        message.channel.send(`${wUser} ha sido expulsado por tener 3 advertencias.`)
    }
}

module.exports.help = {
    name: "advertir"
}