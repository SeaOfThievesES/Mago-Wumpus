const { Event } = require("../index");
const { RichEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { });
    }

    async run(member) {
        const canalDespedida = member.guild.channels.find(`name`, "entrada-salida");
    
        let canalDespedidaEmbed = new RichEmbed()
        .setTitle("**¡Hasta otra!**")
        .setDescription(`¡${member.displayName} ha salido de la **${member.guild.name}**.\n\nAl traspasar la barrera mágica sus roles han desaparecido.`)
        .setImage("https://cdn.discordapp.com/attachments/480396475981889536/481209963998347277/2018-08-20_22-59-24.gif")
        .setTimestamp()
        .setColor("#7289da");
        canalDespedida.send(canalDespedidaEmbed);
    }
}
