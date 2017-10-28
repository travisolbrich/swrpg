import * as express from "express";
import * as bodyParser from 'body-parser';

let secrets = require('./../secrets.json');

let app = express();
let PORT:number = secrets.port;

app.use('/node_modules', express.static(__dirname + '/node_modules'))
    .use(express.static(__dirname + '/public/'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json(null));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// <editor-fold desc="Front end pages>
// app.get('/', function(req:any, res:any) {
//     // res.sendFile('index.html', { root: __dirname + "/public/" });
//
//     // This app.get literally does nothing, and I don't know why
//     // I've fixed it by redirecting in angular, but still...
// });


app.get('*', function(req:any, res:any) {
    let requestedPath = req.path;

    if (requestedPath[requestedPath.length-1] === '/') {
        requestedPath = requestedPath.substring(0, requestedPath.length-1);

        res.redirect(requestedPath);
    } else {
        res.sendFile('index.html', { root: __dirname + "/public/" });
    }
});
// </editor-fold desc="Front end pages>

console.log("Server running on port " + PORT);
app.listen(PORT);