const uuid = require("uuid");
const { PassThrough } = require("stream");
class Token {
    constructor(id, username, timezone, country, lon, lat, group) {
        this.queue = new PassThrough();
        this.Info = {
            id: id, // ID from database.
            username: username, // Username (proper)
            token: uuid(),
            userGroup: group
        };
        this.presence = {
            timezone: timezone,
            countryId: country,
            permissions: 8, // Bancho privileges, for irc.
            longitude: lon,
            latitude: lat
        }
        this.status = {
            status: 0,
            statusText: '',
            beatmap: {
                beatmapChecksum: '',
                currentMods: 0,
                playMode: 0,
                beatmapId: 0,
            },
            rankedScore: 0,
            accuracy: 0,
            playCount: 0,
            totalScore: 0,
            rank: 0,
            performance: 0,

        };
        this.usingRelax = false;
        this.relaxAnnouncement = false;
    }

    enqueue(buffer) {
        this.queue.push(buffer);
    }
}

module.exports = Token;