const botconfig = require("./config/botconfig.json");
const token = require("./config/token.json");
const Discord = require("discord.js");
const Client = new Discord.Client();
const fs = require("fs");
const Command =  require('./Command');
const Event =  require('./Event');
Client.commands = new Discord.Collection();

reloadCmds();
reloadEvents();

module.exports.reloadCmds = reloadCmds;
module.exports.reloadEvents = reloadEvents;

async function reloadCmds() {
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
            let Comando = require(`./commands/${f}`);
            console.log(`Comando ${f} cargado!`);
            let command = new Comando(Client, f, '+');
            Client.commands.set(command.name, command);
        })
    });
}

async function reloadEvents() {
    fs.readdir("./events/", (err, files) =>{
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
            console.log("No se han podido encontar eventos");
            return;
        }

        jsfile.forEach((f, i) =>
        {
            let Evento = require(`./events/${f}`);
            console.log(`Evento ${f} cargado!`);
            let event = new Evento(Client, f, '+');
            Client.on(event.name, event.run.bind(event));
            delete require.cache[require.resolve(`./events/${f}`)];
        })
    });
}

Client.login(token.token);

module.exports.Command = Command;
module.exports.Event = Event;
