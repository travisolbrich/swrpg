import * as express from "express";
import * as bodyParser from "body-parser";
import * as mysql from "mysql";
import {SQL} from "./js/sql_connection";

let secrets = require("./../secrets.json");

let app = express();
let PORT: number = secrets.port;

app.use("/node_modules", express.static(__dirname + "/node_modules"))
    .use(express.static(__dirname + "/public/"))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json(null));
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// <editor-fold desc="API links">
app.get("/api/weapons", function(req: any, res: any){ // get all weapons, with all info
    let query: string = "SELECT * FROM swrpg.weapons;";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/weapon/:key", function(req: any, res: any){ // get all info for one specific weapon
    let query: string = "SELECT * FROM swrpg.weapons WHERE weapons.key = " + mysql.escape(req.params.key) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/weapon/:key/sources", function(req: any, res: any){ // gets sources for specific weapon key
    let query: string = "SELECT * FROM swrpg.weapon_sources where weapon_id =" + mysql.escape(req.params.key) + ";";

    SQL.selectFromDatabase(req, res, query);
});

app.get("/api/weapon/:key/categories", function(req: any, res: any){ // gets sources for specific weapon key
    let query: string = "SELECT * FROM swrpg.weapon_categories where weapon_id =" + mysql.escape(req.params.key) + ";";

    SQL.selectFromDatabase(req, res, query);
});
// </editor-fold desc="API links">


// <editor-fold desc="Front end pages">
app.get("/", function(req: any, res: any) {
    res.sendFile("index.html", { root: __dirname + "/../public/" });
});


app.get("*", function(req: any, res: any) {
    let requestedPath = req.path;

    if (requestedPath[requestedPath.length - 1] === "/") {
        requestedPath = requestedPath.substring(0, requestedPath.length - 1);

        res.redirect(requestedPath);
    } else {
        res.sendFile("index.html", { root: __dirname + "/public/" });
    }
});
// </editor-fold desc="Front end pages>

console.log("Server running on port " + PORT);
app.listen(PORT);