const { Event } = require("../index");
const { RichEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { });
    }

    async run(member) {
        const canalBienvenida = member.guild.channels.find(`name`, "entrada-salida");
        const sinhogarRol = member.guild.roles.find(`name`, "Sinhogar");
        
        //canalBienvenida.send(`¡Hola ${member}, bienvenido a la Casa de la Brillantez!\nPreséntate en la #salacomún y pide tu rol de la casa mencionando al @Ministerio de la Brillantez.\nhttps://gph.is/2nO4OuI`);
        
        let bienvenidoEmbed = new RichEmbed()
        .setTitle("¡Bienvenid@!")
        .setDescription(`${member} has entrado a la **${member.guild.name}**!\n\nPreséntate en la #salacomún y pide tu rol al Ministerio de la Brillantez.`)
        .setImage("https://cdn.discordapp.com/attachments/480419711302107136/480788908821577758/2018-08-19_19-22-55.gif")
        .setTimestamp()
        .setColor("#7289da");
        canalBienvenida.send(`${member}`, {embed: bienvenidoEmbed});
        member.addRole(sinhogarRol.id);
    }
}