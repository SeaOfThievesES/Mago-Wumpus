const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const config = require("../config/botconfig.json");

module.exports.run = async (bot, message, args) =>
{
    var exec = require('child_process').exec;
    //message.delete();
    if (message.author.id !== config.ownerID) return;
	const code = args[0];
	let executed = exec(code, function (error, stdout, stderr) {
        message.channel.send('stdout: ' + stdout);
        message.channel.send('stderr: ' + stderr);
        if (error !== null) {
            message.channel.send('exec error: ' + error);
        }
    });

    executed();
}

module.exports.help = {
    name: "exec"
}