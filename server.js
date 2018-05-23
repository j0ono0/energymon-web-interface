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

// Select "src" folder if CLI arg present
if(process.argv[2] === "src"){
    app.use(express.static('src'));
}else{
    app.use(express.static('dist'));    
}

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/networks.json', (req, res) => res.json(
    {
        "saved": networks_saved,
        "found": networks_found
    }
));

app.listen(3000, () => console.log('Express listening on port 3000'));