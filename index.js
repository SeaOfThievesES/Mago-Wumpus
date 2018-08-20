const botconfig = require("./config/botconfig.json");
const token = require("./config/token.json");
const Discord = require("discord.js");
const Client = new Discord.Client();
const fs = require("fs");
Client.commands = new Discord.Collection();

this.reloadCmds();
module.exports.reloadCmds = function () {
    fs.readdir("./commands/", (err, files) =>{
        if(err) console.log(err);
    
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log("No se han podido encontar comandos");
            return;
        }
    
        jsfile.forEach((f, i) =>
        {
            delete require.cache[require.resolve(`./commands/${f}`)];
            let props = require(`./commands/${f}`);
            console.log(`Comando ${f} cargado!`);
            Client.commands.set(props.help.name, props);
        })

});
}

Client.on("message", async message => {    
    if(message.author.Client) return;

    let prefixes = JSON.parse(fs.readFileSync("config/prefixes.json"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }   
    let prefix = prefixes[message.guild.id].prefixes; 

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = Client.commands.get(cmd.slice(prefix.length));
    if(message.content.startsWith(prefix)){
    if(commandfile) commandfile.run(Client,message,args,prefix);
    }
   
});

let statuses = ['ser mago', 'lanzar magia', 'hacer magia'];

Client.on("ready", async =>{
    console.log(`¡${Client.user.username} está online!`);
    //Client.user.setActivity(`MAGO WUMPUS`, {type: "PLAYING"});
    setInterval(function(){
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    Client.user.setActivity(`${status}`, {type: "PLAYING"});
   // console.log(status);
    }, 5000)
   // }, 600000)
    
});
Client.on('guildMemberAdd', member => {
    let canalBienvenida = member.guild.channels.find(`name`, "entrada-salida");
    let sinhogarRol = member.guild.roles.find(`name`, "Sinhogar");
    
    //canalBienvenida.send(`¡Hola ${member}, bienvenido a la Casa de la Brillantez!\nPreséntate en la #salacomún y pide tu rol de la casa mencionando al @Ministerio de la Brillantez.\nhttps://gph.is/2nO4OuI`);
    
    let bienvenidoEmbed = new Discord.RichEmbed()
    .setTitle("¡BIENVENID@!")
    .setDescription(`¡${member} has entrado a la ${member.guild.name}!\n\nPreséntate en la #salacomún y pide tu rol al Ministerio.`)
    .setImage("https://cdn.discordapp.com/attachments/480419711302107136/480788908821577758/2018-08-19_19-22-55.gif")
    .setTimestamp()
    .setColor("#7289da");
    canalBienvenida.send(bienvenidoEmbed);
    member.addRole(sinhogarRol.id);
});
Client.on('guildMemberRemove', member => {
    let canalDespedida = member.guild.channels.find(`name`, "entrada-salida");
    
    let canalDespedidaEmbed = new Discord.RichEmbed()
    .setTitle("¡HASTA OTRA!")
    .setDescription(`¡${member.displayName} ha salido de la ${member.guild.name}!\n\nAl traspasar la barrera mágica sus roles han desaparecido.`)
    .setImage("https://cdn.discordapp.com/attachments/480419711302107136/480788908821577758/2018-08-19_19-22-55.gif")
    .setTimestamp()
    .setColor("#7289da");
    canalDespedida.send(canalDespedidaEmbed);
});


Client.login(token.token);
