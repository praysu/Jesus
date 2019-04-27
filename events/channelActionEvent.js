const playerHelper = require("../utils/tokenUtils");
const packetHelper = require("../main_modules/osu-packet")

async function joinChannel(token, channelToJoin) {
    // Get the player's data
    let tokenData = playerHelper.getDataFromToken(token);
    // Make a new writer
    const writer = new packetHelper.Bancho.Writer;

    // check if the channel exists
    for (let i = 0; i < global.channels.length; i++) {
        let channel = global.channels[i];
        if (channelToJoin === channel.name) {
            // TODO: check permissions
            writer.ChannelJoinSuccess(channelToJoin)
            // Enqueue the join channel
            tokenData.enqueue(writer.toBuffer)
        }
    }
}

async function leaveChannel(token, channelToLeave) {
    // Get the player's data
    let tokenData = playerHelper.getDataFromToken(token);
    // Make a new writer
    const writer = new packetHelper.Bancho.Writer;

    // check if the channel exists
    for (let i = 0; i < global.channels.length; i++) {
        let channel = global.channels[i];
        if (channelToLeave === channel.name) {
            // TODO: check permissions
            writer.ChannelRevoked(channelToLeave);
            // Enqueue the leave channel
            tokenData.enqueue(writer.toBuffer)
        }
    }
}

module.exports = {
    joinChannel,
    leaveChannel
}