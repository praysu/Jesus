const app = require("express")();
const config = require("./config.json")
global.players = [];
global.channels = [];
async function main() {
    const { query } = require("./db");
    let q = await query("SELECT * FROM bancho_channels ORDER BY id DESC;")
    q.forEach(channel => {
        global.channels.push(channel);
    })

    if (!config.bancho.useDB) {
        const t = require("./objects/token");
        let b = new t(1, "God", 0, "IL", 1,2,3);
        global.players.push(b);
    } else {
        // get data from db
    }
}  


app.use((req, res, next) => {
    res.set("cho-protocol", 19);
    res.set("Connection", "keep-alive");
    res.set("Keep-Alive", "timeout=5, max=100");
    res.set("Content-Type", "text/html; charset=UTF-8");

    req.on("data", (chunk) => {
        req.raw = Buffer.concat([
            req.raw || Buffer.alloc(0, ""),
            chunk
        ]);
    });
    req.on("end", next);
});

app.get("/", (req, res) => {
    res.end("Bancho Beta")
})


app.post("/", (req, res) => {
    let token = req.header("osu-token");
    if (!token) {
        require("./events/loginEvent")(req, res)
    } else {
        if (require("./utils/tokenUtils").getDataFromToken(req.header("osu-token"))) {
            require("./handlers/mainHandler")(req.raw, res, req.header("osu-token"))
        } else {
            let packetHelper = require("./main_modules/osu-packet");
            const writer = new packetHelper.Bancho.Writer;

            writer.LoginReply(-5);
            res.end(writer.toBuffer);

        }
        
    }
})

main();
app.listen(config.bancho.port);