import {Weapon} from "./weapon.model";
import {Observable} from "rxjs/Observable";
import {SQL} from "./js/sql_connection";
import {fromPromise} from "rxjs/observable/fromPromise";

export class WeaponService {
    public saveWeapon(weapon:Weapon): Observable<boolean> {
        let query = "INSERT INTO `swrpg`.`weapons` " +
            "(`key`, `name`, `description`, `type`, `encumbrance`, `hp`, `price`, `rarity`, `restricted`, `skillkey`, `damage`, `damageAdd`, `crit`, `sizeLow`, `sizeHigh`, `rangeValue`) " +
            "VALUES " +"('" +
                weapon.key + "', '" +
                weapon.name + "', '" +
                weapon.description + "', '" +
                weapon.type + "', '" +
                weapon.encumbrance + "', '" +
                weapon.hp + "', '" +
                weapon.price + "', '" +
                weapon.rarity + "', '" +
                weapon.restricted + "', '" +
                weapon.skillKey + "', '" +
                weapon.damage + "', '" +
                weapon.damageAdd + "', '" +
                weapon.crit + "', '" +
                weapon.sizeLow + "', '" +
                weapon.sizeHigh + "', '" +
                weapon.rangeValue +
            "');";

        return fromPromise(SQL.insertIntoDatabase(query));
    }

}