import * as fs from "fs";
// import * as http from "http";
// import * as Promise from "bluebird";
import * as xml from "xml2js";
import * as sql from "./sql_connection";

let mysql = sql.SQL;
let weaponsFile = "./Weapons.xml";

let weaponsAdded = 0;

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack);

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err);

        let weapons = result["Weapons"]["Weapon"]; // just to make things easier below

        // NOTE: There is currently no check for if a weapon exists, so... you know... be careful
        for (let weapon of result["Weapons"]["Weapon"]) {  // for each weapon in list

            console.log("Adding " + weapon["Name"][0] + " as ID " + (weaponsAdded + 1));  // the [0] gets the value, instead of including all the [''] junk

            let Key = weapon["Key"];
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

            // DON'T RUN THIS UNLESS YOU KNOW WHAT YOU'RE DOING, OH GOD PLEASE
            // IF YOU WANT TO ADD NEW WEAPONS, IT WOULD BE BEST TO CREATE A NEW XML FILE
            // THE INTERNET WAS RIGHT, CAPS LOCK IS CRUISE CONTROL FOR COOL

            // mysql.insertIntoDatabase(
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

            weaponsAdded++;
        }

        console.log(weaponsAdded + " weapons added.");
    });
});