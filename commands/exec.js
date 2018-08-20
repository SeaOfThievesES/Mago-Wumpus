const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const config = require("../config/botconfig.json");

module.exports.run = async (bot, message, args) =>
{
    var exec = require('child_process').exec;
    //message.delete();
    if (message.author.id !== config.ownerID) return;
	const code = args.join("");
	let executed = exec(code, function (error, stdout, stderr) {
        message.channel.send("STDOUT:");
        message.channel.send('```js\n' + stdout + '```');
        message.channel.send("STDERR:");
        if(stderr) {
            message.channel.send('```js\n' + stderr + '```');
        }
    });
}

module.exports.help = {
    name: "exec"
}