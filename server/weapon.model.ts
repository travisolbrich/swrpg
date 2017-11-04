export class Weapon {
    name: string;
    key: string;
    description:string;
    skillKey: string;
    damage: string;
    damageAdd: string;
    crit: string;
    rangeValue: string;
    encumbrance: string;
    hp: string;
    type: string;
    price: string;
    rarity: string;
    restricted: string;
    sizeLow: string;
    sizeHigh: string;

    constructor(weapon: any) {
        this.key = weapon["Key"];
        this.name = weapon["Name"].toString().replace("'", "\\'");
        this.description = weapon["Description"].toString().replace("'", "\\'");
        this.skillKey = weapon["SkillKey"];
        this.damage = weapon["Damage"];
        this.damageAdd = weapon["DamageAdd"];
        this.crit = weapon["Crit"];
        this.rangeValue = weapon["RangeValue"];
        this.encumbrance = weapon["Encumbrance"];
        this.hp = weapon["HP"];
        this.price = weapon["Price"];
        this.rarity = weapon["Rarity"];
        this.restricted = weapon["Restricted"];
        this.type = weapon["Type"];
        this.sizeLow = weapon["SizeLow"];
        this.sizeHigh = weapon["SizeHigh"];
    }
}