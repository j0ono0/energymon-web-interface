const express = require('express')
const app = express()


var networks_found = [
        {
            "name":"Fon WiFi",
            "strength":-84,
        },{
            "name":"Telstra5C49",
            "strength":-90
        },{
            "name":"Telstra2EC8",
            "strength":-20
        },{
            "name":"Hal-North",
            "strength":-79
        },{
            "name":"Telstra Air",
            "strength":-78
        },{
            "name":"TGP fastAir",
            "strength":-40
        }
    ];
var networks_saved = [
        {
            "name":"myHiddenNetwork",
            "pwd":"sshhhhhhh!"
        },{
            "name":"Telstra2EC8",
            "pwd":"high-5ecurity"
        },{
            "name":"TGP fastAir",
            "pwd":"nevaguess;P",
            "connected": true
        }
    ];

// Get root directory for application
var path = require('path');
var appPath = path.dirname(require.main.filename);

// Select "src" folder if CLI arg present
if(process.argv[2] === "src"){
    app.use(express.static('src'));
    appPath += '/src';
}else{
    app.use(express.static('dist'));  
    appPath += '/dist';  
}

app.get('/networks.json', (req, res) => res.json(
    {
        "saved": networks_saved,
        "found": networks_found
    }
));

app.get('*', function(req, res) {
    res.sendFile(appPath + '/index.html');
});


app.listen(3000, () => console.log('Express listening on port 3000'));