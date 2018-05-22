const express = require('express')
const app = express()

// Select "src" folder if CLI arg present
if(process.argv[2] === "src"){
    app.use(express.static('src'));
}else{
    app.use(express.static('dist'));    
}

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/networks.json', (req, res) => res.json(
    {"data":[
        {
            "name":"blam",
            "strength":-70, 
            "pwd":"password1234"
        },{
            "name":"Fon WiFi",
            "strength":-84,
        },{
            "name":"Telstra2EC8",
            "strength":-83, 
            "pwd":"12345678a*",
            "connected": true
        },{
            "name":"Telstra5C49",
            "strength":-90
        },{
            "name":"Hal-North",
            "strength":-79
        },{
            "name":"Telstra Air",
            "strength":-78
        }
    ]}
));

app.listen(3000, () => console.log('Express listening on port 3000'));