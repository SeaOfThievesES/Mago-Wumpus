const { Event } = require("../index");
const botconfig = require("../config/botconfig.json");
const fs = require("fs");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: 'message'
        });
    }

    async run(message) {
        if(message.author.bot) return;

        let prefixes = JSON.parse(fs.readFileSync("config/prefixes.json"));

        if(!prefixes[message.guild.id]){
            prefixes[message.guild.id] = {
                prefixes: botconfig.prefix
            };
        }   
        let prefix = prefixes[message.guild.id].prefixes; 

        if(message.content.startsWith(prefix)){
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);
            let commandfile = this.bot.commands.get(cmd.slice(prefix.length));
            if(commandfile) await commandfile.run(message,args);
        }
    }
}