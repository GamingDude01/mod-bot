const Discord = require('discord.js');
const{ play, stop} = require('./commands');

const bot = new Discord.Client();

const prefix = '-';

var version = '1.0.1';

bot.on('ready', () => {
    console.log('Your Discord BOT is Online! ' + version);
    bot.user.setActivity(' YouTube & Looking over your Discord Server!', {
        type: 'WATCHING'
    }).catch(console.error);    
})

bot.on('message', (msg) => {
    if (msg.author.bot) return;

    if(!msg.content.startsWith(prefix))return;
    const commandName = getCommandName(prefix, msg.content);
    const args = getCommandArgs(prefix, msg.content);

    if(commandName === 'play')
    return play(msg, args);
    else if (commandName === 'stop')
    return stop(msg, args);
});

function getCommandName(prefixx, content) {
    return content // .play adamjr
    .slice(prefix.length) //play adamjr
    .split(' ')[0];
}
function getCommandArgs(prefix,content) {
    return content
    .slice(prefix.length)
    .split(' ')
    .slice(1);
}

bot.login('NzcwOTc3MjA5OTQ2OTk2NzQ2.X5laeg.2iymfHal74r3DOgPH5yztN-hq1A');