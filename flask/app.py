from flask import Flask
from flask import render_template
from flask import request

### Dummy data ###
config = {
    'firmware': "0.1.2.3",
    'settings':{
        'EIC1':[('crc1',1),('crc2',3),('gain',2),('ugain',2)],
        'EIC2':[('crc1',2),('crc2',0),('gain',0),('ugain',5)]
    }
}
networks_found = [
    {
        "id":1,
        "name":"Fon WiFi",
        "strength":-84,
    },{
        "id":2,
        "name":"Telstra5C49",
        "strength":-90
    },{
        "id":3,
        "name":"Telstra2EC8",
        "strength":-20
    },{
        "id":4,
        "name":"Hal-North",
        "strength":-79
    },{
        "id":5,
        "name":"Telstra Air",
        "strength":-78,
        "pwd":"high-5ecurity"
    },{
        "id":6,
        "name":"TGP fastAir",
        "strength":-40,
        "pwd":"nevaguess;P",
        "connected": True
    }
]
networks_saved = [
    {
        "name":"myHiddenNetwork",
        "pwd":"sshhhhhhh!"
    },{
        "name":"Telstra2EC8",
        "pwd":"high-5ecurity"
    },{
        "name":"TGP fastAir",
        "pwd":"nevaguess;P",
        "connected": True
    }
]
### end dummy data ###


app = Flask(__name__)

@app.route('/')
def hello_world(name=None):
    return render_template('index.html', name=name)

@app.route('/logging')
def logging(id=None):
        context = {
            
        }
        return render_template('logging.html', **context)    

@app.route('/networks')
def network_list(id=None):
        context = {
            'network_list': networks_found
        }
        return render_template('networks.html', **context)

@app.route('/device')
def device_config(id=None):
        context = {
            'config': config
        }
        return render_template('device.html', **context)
    
@app.route('/network/', methods=['POST','GET'])
@app.route('/network/<int:id>', methods=['POST','GET'])
def network_reg(id=None):
    if request.method == 'POST':
        # validate and process data here
        pass
    else:
        # Load relevant network details
        ssid = 'network.name'
        pwd = 'network.pwd'
        ssid = ''
        pwd = ''
        connected = False
        if id != None:
            for network in networks_found:
                if network['id'] == int(id):
                    ssid = network['name']
                    pwd = network.get('pwd','')
                    connected = network.get('connected',False)

        # Send network registeration page
        context = {
            'ssid': ssid,
            'pwd': pwd,
            'connected': connected
        }
        return render_template('network_reg.html', **context)