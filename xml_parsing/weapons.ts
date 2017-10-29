import * as fs from "fs";
import * as http from "http";
import * as Promise from "bluebird";
import * as xml from "xml2js";
import {SQL} from "../server/js/sql_connection";

let secrets: any = require("../secrets.json"); // file that contains all the login info and other stuff
let weaponsFile = "./Weapons.xml"; // file that contains all the weapons, I just copied the file from my swrpg directory

let weaponsAdded = 0; // used later to show how many weapons were added, more of a debug thing

fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack); // error logging, watch out

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err); // it's more error logging
        let weapons = result["Weapons"]["Weapon"]; // just to make things easier below

        // getWeaponID("DH17")
        //     .then(function (weaponID: any) {
        //         console.log(weaponID);
        //     });

        for (let weapon of result["Weapons"]["Weapon"]) {  // for each weapon in list
            addWeapon(weapon);
            // addWeaponSource(weapon);
        }

        console.log(weaponsAdded + " weapons added.");
    });
});

function addWeapon(weapon: any) {
    return new Promise(function (resolve) {
        console.log("Attempting to add " + weapon["Name"][0] + " as ID " + (weaponsAdded + 1));  // the [0] gets the value, instead of including all the [''] junk

        let Key = weapon["Key"];  // get the key first, as we use it to check if the weapon exists already

        getWeaponID(Key[0]).then(function (weaponID) {
            if (weaponID === -1) { // if weaponID  is -1, the weapon already exists, so we can ignore it, but if it's not we'll add the weapon
                // get all the necessary values
                let Name = weapon["Name"].toString().replace("'", "\\'");
                let Description = weapon["Description"].toString().replace("'", "\\'");
                let SkillKey = weapon["SkillKey"];
                let Damage = weapon["Damage"];
                let Crit = weapon["Crit"];
                let RangeValue = weapon["RangeValue"];
                let Encumbrance = weapon["Encumbrance"];
                let HP = weapon["HP"];
                let Price = weapon["Price"];
                let Rarity = weapon["Rarity"];
                let Type = weapon["Type"];
                let Restricted = weapon["Restricted"];

                // SQL.insertIntoDatabase( // create query and send to database
                //     "INSERT INTO `swrpg`.`weapons` " +
                //     "(`key`, `name`, `description`, `skillkey`, `damage`, `crit`, `rangevalue`, `encumbrance`, `hp`, `price`, `rarity`, `type`, `restricted`) VALUES " +
                //     "(" +
                //     "'" + Key + "', " +
                //     "'" + Name + "', " +
                //     "'" + Description + "', " +
                //     "'" + SkillKey + "', " +
                //     "'" + Damage + "', " +
                //     "'" + Crit + "', " +
                //     "'" + RangeValue + "', " +
                //     "'" + Encumbrance + "', " +
                //     "'" + HP + "', " +
                //     "'" + Price + "', " +
                //     "'" + Rarity + "', " +
                //     "'" + Type + "', " +
                //     "'" + Restricted + "'" +
                //     ");"
                // );
                console.log("Adding weapon with key " + Key);

                weaponsAdded++;
            } else {
              console.log("Weapon with key " + Key + " already exists");
            }
        });

        resolve(true); // pretty sure this promise isn't actually doing anything right now, just threw it in there for later if need be
    });
}

function addWeaponSource(weapon: any) {
    return true;
}

function getWeaponID(weaponKey: any) {
    return new Promise(function (resolve) {
        let options: any = {
            host: "localhost",
            path: "/api/weapon/" + weaponKey,
            method: "GET",
            port: secrets.port
        };

        http.request(options, function (res: any) {
            let data: string = "";  // create blank string to hold body
            res.on("data", function (body: string) {data += body}); // put body into string we created
            res.on("end", function () {
                let apiResponse: any = JSON.parse(data);

                // console.log(apiResponse[0]);

                if (apiResponse[0] !== undefined) {
                    resolve(apiResponse[0]["id"]);
                } else {
                    console.log("Weapon not found with key " + weaponKey);
                    resolve(-1);
                }
            });
        }).end();
    });
}