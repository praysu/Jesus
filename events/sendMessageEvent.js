const packetHelper = require("../main_modules/osu-packet");
const playerUtils = require("../utils/tokenUtils");


async function handle(token, data) {
    // Initialise the writer
    const writer = new packetHelper.Bancho.Writer;
    // Get the player from token
    let Player = playerUtils.getDataFromToken(token);
    // Get the message from the data
    let message = data.message;
    // Get the target
    let target = data.target;

    // Check if the message starts with ! for commands

    // Checks if the target starts with # for a channel
    if (target.startsWith("#")) {
        // Send the message
        writer.SendMessage({
            sendingClient: Player.Info.username,
            message: message,
            target: target,
            senderId: Player.Info.id
        });
        // Log the message
        // Enqueue the emssage to everyone butt he sender
        global.players.forEach(player => {
        	if (player.Info.username == Player.Info.username) {
        		return
        	}
            player.enqueue(writer.toBuffer);
        });
    } else {
        // Get the 2nd player 
        let Player2 = playerUtils.getDataFromUsername(target);
        // Initialise the send message
        writer.SendMessage({
            sendingClient: Player.Info.username,
            message: message,
            target: target,
            senderId: Player.Info.id
        });
        // Send the message to the 2nd player
        Player2.enqueue(writer.toBuffer)
    }
}

module.exports = handle;
