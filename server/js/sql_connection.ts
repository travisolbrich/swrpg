import * as mysql from "mysql";
import * as Promise from "bluebird";
import {Observable} from "rxjs/Observable";

let secrets: any = require("./../../secrets.json");

let pool: any = mysql.createPool({
    connectionLimit: 100,
    host: secrets.db.host,
    user: secrets.db.username,
    password: secrets.db.password,
    database: secrets.db.database,
    debug: false
});

export namespace SQL {
    export function selectFromDatabase(req: any, res: any, query: string) { // basically just retrieves a select call and returns it as json
        return new Promise(function (resolve) {
            req = null;

            pool.getConnection(function (err: any, connection: any) {
                if (err) {
                    res.json({"code": 100, "status": "Error in connection database"});
                    resolve(false);
                }

                connection.on("error", function (err: any) {
                    res.json({"code": 100, "status": "Error in connection database"});
                    if (err) resolve(false);
                });

                connection.query(query, function (err: any, rows: any) {
                    connection.release();
                    if (!err) {
                        res.json(rows);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        });
    }

    export function insertIntoDatabase(query: string) { // sends a query to the database, super dirty, proba- it's dangerous
        return new Promise(function (resolve) {
            pool.getConnection(function (err: any, connection: any) {
                if (err) {
                    resolve(false);
                    console.error(err.stack);
                    return;
                }

                connection.on("error", function (err: any) {
                    resolve(false);
                    console.error(err.stack);
                });

                connection.query(query, function (err: any) {
                    if (err) {
                        resolve(false);
                        console.error(err.stack);
                    } else {
                        resolve(true);
                        connection.release();
                    }
                });
            });
        });
    }
}