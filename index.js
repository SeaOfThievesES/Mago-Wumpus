const botconfig = require("./config/botconfig.json");
const token = require("./config/token.json");
const Discord = require("discord.js");
const Client = new Discord.Client();
const fs = require("fs");
Client.commands = new Discord.Collection();

reloadCmds();
function reloadCmds(){
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
    
    //RESETEO DEL BOT
    
    if(message.content === `${botconfig.prefix}reiniciar`){
        if (message.member.hasPermission("ADMINISTRATOR")) return message.reply("¡No puedes hacer eso!");
        resetClient(message.channel);     
    }
    function resetClient(channel) {
        reloadCmds();
        console.log("REINICIO");
        channel.send('Reiniciando comandos...')
        .then(msg => Client.destroy())
        .then(() => Client.login(token.token));
    }
   
});

let statuses = ['ser mago', 'lanzar magia'];

Client.on("ready", async =>{
    console.log(`¡${Client.user.username} está online!`);
    Client.user.setActivity(`MAGO WUMPUS`, {type: "PLAYING"});
    setInterval(function(){
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    Client.user.setActivity(`${status}`, {type: "PLAYING"});
   // console.log(status);
    }, 5000)
   // }, 600000)
    
});
Client.on('guildMemberAdd', member => {
    //let canalBienvenida = message.guild.channels.find(`name`, "general");
    //canalBienvenida.send(`¡${member} bienvenido!`);
});


Client.login(token.token);
