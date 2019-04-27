const packetHelper = require("../main_modules/osu-packet");

function getDataFromToken(token) {
    for (let i = 0; i < global.players.length; i++) {
        const t = global.players[i];
        if (t.Info.token === token) {
            return t
        }
    }
}

function getDataFromUsername(username) {
    for (let i = 0; i < global.players.length; i++) {
        const t = global.players[i];
        if (t.Info.username === username) {
            return t
        }
    }
}

function getDataFromID(id) {
    for (let i = 0; i < global.players.length; i++) {
        const t = global.players[i];
        if (t.Info.id === id) {
            return t
        }
    }
}

function removeToken(token) {
    const writer = new packetHelper.Bancho.Writer;
    for (let i = 0; i < global.players.length; i++) {
        if (global.players[i].Info.token === token) {

            writer.HandleUserQuit({
                userId: global.players[i].Info.id,
                state: 0
            });


            global.players.forEach(player => {
                player.enqueue(writer.toBuffer)
            })

            global.players.splice(i, 1);
        }
    }
}

module.exports = {
    getDataFromToken,
    getDataFromUsername,
    getDataFromID,
    removeToken
}