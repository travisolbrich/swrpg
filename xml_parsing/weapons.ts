import * as fs from "fs";
import * as http from "http";
import * as Promise from "bluebird";
import * as xml from "xml2js";

let weaponsFile = "./Weapons.xml";
let extractedData = "";


console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack);

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err);

        extractedData = result["Weapons"]["Weapon"][0];
        console.log(extractedData);
    });
});
