const { Event } = require("../index");
const statuses = ['ser mago', 'lanzar magia', 'hacer magia'];

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { });
    }

    async run() {
        console.log(`¡${this.bot.user.username} está online!`);
        const bot = this.bot;
        setInterval(function(){
            const status = statuses[Math.floor(Math.random()*(statuses.length - 1))];
            this.bot.user.setActivity(`${status}`, {type: "PLAYING"});
        }, 60000);
    }
}