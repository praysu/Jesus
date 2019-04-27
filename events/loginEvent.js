const osu_packet = require("../main_modules/osu-packet");
const tokenClass = require("../objects/token");
const { query } = require("../db");

async function handle(req, res) {
	const writer = new osu_packet.Bancho.Writer;

    let rawData = req.raw;
    let data = rawData.toString("utf-8");
    data = data.split("\n");
   
    let username = data[0];
    let password = data[1];
    let clientData = data[2].split("|");
    let clientVersion = clientData[0];
    let systemInfo = clientData[3].split(":");
    let timeZone = Number(clientData[1]);
    

    // Make player class
    const player = new tokenClass(2,username,timeZone,"XX",1,1,3)
    global.players.push(player);
    
    // IRC Channels


    // Ok, finalise login
    res.set("cho-token", player.Info.token)
    console.log(`${username} has tried to log in`)
    writer.LoginReply(Math.round(Math.random() * 10));
    let q = await query("SELECT * FROM bancho_channels ORDER BY id DESC");
    q.forEach(channel => {
        writer.ChannelAvailable({ channelName: channel.name, channelTopic: channel.description, channelUserCount: 0 });
    })
    writer.ChannelJoinSuccess("#osu");
    res.end(writer.toBuffer)

}

module.exports = handle;