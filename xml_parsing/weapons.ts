import * as fs from "fs";
// import * as http from "http";
// import * as Promise from "bluebird";
import * as xml from "xml2js";
// import * as sql from "./sql_connection";

let weaponsFile = "./Weapons.xml";

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack);

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err);

        for (let weapon of result["Weapons"]["Weapon"]) {  // for each weapon in list
            console.log(weapon["Name"][0]);  // the [0] gets the value, instead of including all the [''] junk
        }
    });
});
