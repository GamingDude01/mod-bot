const downloadYT = require('ytdl-core');
const searchYT = require('yt-search');

async function play(msg, ...args) { //admjr, discord bot
    const vc = msg.member.voice.channel;

    const connection = await vc.join();
    const video = await findVideo(args.join(' ')); //adamjr discord bot

    if (video) {
        const stream = downloadYT(video.url, {filter: 'audioonly'});
        connection.play(stream, {seek: 0, volume: 1});

        await msg.reply(` Now Playing \`${video.title}\`.`);
    } else
    await msg.reply(`No Results Found.`);

    server.dispatcher.on("finish", () =>{
        if(server.queue[0]){
            play(connection, message);
        }else{
            connection.disconnect();
        }
        });

}
async function findVideo(query) {
    const result= await searchYT(query);
    return (result.videos.length > 1)
    ? result.videos[0]
    :null;
    
}

async function stop(msg) {
    const vc = msg.member.voice.channel;
    await vc.leave();

    await msg.reply('Stopped.');

    server.dispatcher.on("finish", () =>{
        if(server.queue[0]){
            play(connection, message);
        }else{
            connection.disconnect();
        }
        });


}

module.exports.play = play;
module.exports.stop = stop;