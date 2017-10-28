import * as fs from "fs";
import * as http from "http";
import * as Promise from "bluebird";
import * as xml from "xml2js";

let weaponsFile = "./Weapons.xml";

let Key, Name, Description, SkillKey, Damage, Crit, RangeValue, Encumbrance, HP, Price, Rarity, Type;


console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
fs.readFile(weaponsFile, "utf8", function (err: any, data: any) {
    if (err) return console.error(err.stack);

    xml.parseString(data, function (err, result) {
        if (err) return console.log(err);

        Key = result["Weapons"]["Weapon"][0]["Key"];
        Name = result["Weapons"]["Weapon"][0]["Name"];
        Description = result["Weapons"]["Weapon"][0]["Description"];
        SkillKey = result["Weapons"]["Weapon"][0]["SkillKey"];
        Damage = result["Weapons"]["Weapon"][0]["Damage"];
        Crit = result["Weapons"]["Weapon"][0]["Crit"];
        RangeValue = result["Weapons"]["Weapon"][0]["RangeValue"];
        Encumbrance = result["Weapons"]["Weapon"][0]["Encumbrance"];
        HP = result["Weapons"]["Weapon"][0]["HP"];
        Price = result["Weapons"]["Weapon"][0]["Price"];
        Rarity = result["Weapons"]["Weapon"][0]["Rarity"];
        Type = result["Weapons"]["Weapon"][0]["Type"];

        console.log("Key: " + Key);
        console.log("Name: " + Name);
        console.log("Description: " + Description);
        console.log("SkillKey: " + SkillKey);
        console.log("Damage: " + Damage);
        console.log("Crit: " + Crit);
        console.log("RangeValue: " + RangeValue);
        console.log("Encumbrance: " + Encumbrance);
        console.log("HP: " + HP);
        console.log("Price: " + Price);
        console.log("Rarity: " + Rarity);
        console.log("Type: " + Type);
    });
});
