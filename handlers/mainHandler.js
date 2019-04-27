let packetHelper = require("../main_modules/osu-packet");
const playerUtils = require("../utils/tokenUtils");

async function handle(packet, res, token) {
	const reader = new packetHelper.Client.Reader(packet);
    const writer = new packetHelper.Bancho.Writer(packet);

    const data = reader.Parse()

    const player = playerUtils.getDataFromToken(token);
	for (let i = 0; i < data.length; i++) {
		let Packet = data[i];
		switch (Packet.id) {
			case 1:
                require("../events/sendMessageEvent")(token, Packet.data)
                break;
            case 4:
            	break;
            case 63:
            	require("../events/channelActionEvent").joinChannel(token, Packet.data)
            	break;
			default:
				console.dir(Packet);
		}

 	}
 	let buffer_data = player.queue.read() || Buffer.alloc(0);
    res.end(Buffer.concat([writer.toBuffer, buffer_data]));

}

module.exports = handle;