import * as fs from "fs";
import * as http from "http";
import * as Promise from "bluebird";
import * as xml from "xml2js";
import {SQL} from "../server/js/sql_connection";
import {log} from "util";

// General vars
let secrets: any = require("../secrets.json"); // file that contains all the login info and other stuff
let weaponsFile = "./Weapons.xml"; // file that contains all the weapons, I just copied the file from my swrpg directory

let weaponsAdded = 0; // used later to show how many weapons were added, more of a debug thing
let weaponSourcesAdded = 0; // sources
let weaponCatsAdded = 0; // categories, unfortunately, no felines
let weaponQualsAdded = 0; // qualities

// actual script
fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack); // error logging, watch out

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err); // it's more error logging
        let weapons = result["Weapons"]["Weapon"]; // just to make things easier below


        // let weapon = weapons[84];
        // console.log(weapon["Source"][0]["$"]);

        Promise.map(weapons, function (weapon) { // an async for loop for the array of weapons to keep everything in order
            // addWeapon(weapon);
            addWeaponSource(weapon);
        }).then(function () {
            console.log(weaponsAdded + " weapons added.");
        });
    });
});

// <editor-fold desc="Functions">
function addWeapon(weapon: any) {
    return new Promise(function (resolve) {
        try {
            let isWeaponAdded: boolean = false; // used for the resolve
            console.log("Attempting to add " + weapon["Name"][0] + " as ID " + (weaponsAdded + 1));  // the [0] gets the value, instead of including all the [''] junk

            let Key = weapon["Key"];  // get the key first, as we use it to check if the weapon exists already

            getWeaponID(Key[0]).then(function (weaponID) {
                if (weaponID === -1) { // if weaponID  is -1, the weapon already exists, so we can ignore it, but if it's not we'll add the weapon
                    let Name = weapon["Name"].toString().replace("'", "\\'"); // get all the necessary values
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

                    isWeaponAdded = true;
                    weaponsAdded++;
                } else {
                    console.log("Weapon with key " + Key + " already exists with ID " + weaponID);
                }
            }).then(function () {
                resolve(isWeaponAdded);
            });
        } catch (exc) {
            console.log("Something went wrong: " + exc);
            resolve(false);
        }
    });
}

function addWeaponSource(weapon: any) { // adds weapon sources to db
    return new Promise(function (resolve) {
        try {
            let isWeaponSourceAdded: boolean = false; // used for the resolve
            console.log("Attempting to add sources for " + weapon["Name"][0] + " with ID " + (weaponSourcesAdded + 1));  // the [0] gets the value, instead of including all the [''] junk

            let Key = weapon["Key"];  // get the key first, as we use it to check if the weapon exists yet, in this scenario, don't want to add sources for a weapon that doesn't exist

            getWeaponID(Key).then(function (weaponID) { // first make sure weapon exists in db
                if (weaponID !== -1) { // Key not found in db, no need to go further
                    getWeaponSources(Key, weaponID).then(function (dbSources) {
                        if (dbSources === -1) { // if dbSources = -1, the weapon does not have sources added yet
                            let Page; // set down below

                            if (weapon["Sources"] === undefined) { // if this is undefined, weapon only has one source
                                let xmlSource = weapon["Source"];

                                try {
                                    Page = xmlSource[0]["$"]["Page"];
                                } catch (exc) {
                                    Page = -1; // sometimes there is no page for the source, so we'll just set it as -1 in that case
                                }

                                let Source = xmlSource[0]["_"];

                                console.log("INSERT INTO `swrpg`.`weapon_sources` (`weapon_id`, `page`, `source_book`) VALUES " +
                                    "('" + weaponID + "', '" + Page + "', '" + Source + "');");
                            } else {
                                let sources = weapon["Sources"][0]["Source"];

                                Promise.map(sources, function (xmlSource) {
                                    try {
                                        Page = xmlSource["$"]["Page"];
                                    } catch (exc) {
                                        Page = -1; // sometimes there is no page for the source, so we'll just set it as -1 in that case
                                    }
                                    let Source = xmlSource["_"];

                                    console.log("INSERT INTO `swrpg`.`weapon_sources` (`weapon_id`, `page`, `source_book`) VALUES " +
                                        "('" + weaponID + "', '" + Page + "', '" + Source + "');");

                                    // SQL.insertIntoDatabase( // create query and send to database
                                    //     "INSERT INTO `swrpg`.`weapon_sources` (`weapon_id`, `page`, `source`) VALUES " +
                                    //     "('" + weaponID + "', '" + Page + "', '" + Source + "');"
                                    // );
                                });
                            }
                            console.log("Adding sources for weapon with key " + Key);

                            isWeaponSourceAdded = true;
                            weaponSourcesAdded++;
                        } else { // however, if sources are returned, we don't need to do anything
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
                                Key + " already has " + dbSources.length + " sources\n" +
                                Key + " has " + weapon["Sources"][0]["Source"].length + " in xml file\n" +
                                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        }
                    });
                } else {
                    console.log("Weapon with key " + Key + " not found in db");
                }
            });
        } catch (exc) {
            console.log("Something went wrong: " + exc);
            resolve(false);
        }
    });
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
} // gets the ID of a specific weapon

function getWeaponSources(weaponKey: any, weaponID: any) {
    return new Promise(function (resolve) {
        let options: any = {
            host: "localhost",
            path: "/api/weapon/" + weaponID + "/sources",
            method: "GET",
            port: secrets.port
        };

        http.request(options, function (res: any) {
            let data: string = "";  // create blank string to hold body
            res.on("data", function (body: string) {data += body}); // put body into string we created
            res.on("end", function () {
                let apiResponse: any = JSON.parse(data);

                if (apiResponse[0] !== undefined) { // sources for this weapon are not in db yet
                    resolve(apiResponse);
                } else {
                    resolve(-1); // weapon has no sources
                }
            });
        }).end();
    }); // checks if a weapon already has sources in db
}
// </editor-fold desc="Functions">