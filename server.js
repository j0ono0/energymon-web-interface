const express = require('express')
const app = express()

console.log(process.argv);

// Select "src" folder if CLI arg present
if(process.argv[2] === "src"){
    app.use(express.static('src'));
}else{
    app.use(express.static('dist'));    
}

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/wifi.json', (req, res) => res.json({
        "data":[{"name": "blam", "strength":-70},{"name": "Fon WiFi", "strength":-84},{"name": "Telstra2EC8", "strength":-83},{"name": "Telstra5C49", "strength":-90},{"name": "Hal-North", "strength":-79},{"name": "Telstra Air", "strength":-78}]}
   ));

app.listen(3000, () => console.log('Express listening on port 3000'));