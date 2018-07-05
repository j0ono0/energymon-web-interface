import picoweb
import uasyncio
import ujson
import btree

'''
# Create required databases if they don't already exist
from helpers import data
data.make_networkdb()
data.make_loggerdb()
data.make_configdb()
'''

app = picoweb.WebApp(None)

class Alert:
    def __init__(self,type='info',message=''):
        self.type = type
        self.message = message
        
class Network:
    def __init__(self, ssid, strength=None, pwd=None, connected=False):
        self.ssid = ssid
        self.strength = strength
        self.pwd = pwd
        self.connected = connected
    
    def __str__(self):
        return self.ssid 

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "index.html", ("connected ssid", "AWS IoT", "0.0.0.3"))

@app.route("/networks", methods=['GET', 'POST'])
def networks(req, resp):
    if req.method == 'POST':
        # Process form
        yield from req.read_form_data()
        ssid = req.form.get('ssid')[0]
        pwd = req.form.get('pwd')[0]
        
        f = open("networkdb", "r+b")
        db = btree.open(f)
        
        if req.form.get('connect'):
            try:
                network = ujson.loads(db[ssid])
                network['pwd'] = pwd
            except KeyError:
                network = {
                    "ssid": ssid,
                    "pwd": pwd,
                    "strength": None,
                    "connected": False
                }
            db[ssid] = ujson.dumps(network)
            # TODO attempt to connect to network
            print('connect to network: %s / pwd:%s' %(ssid,pwd))
        elif req.form.get('forget'):
            del db[ssid]
            print('Forget network: %s ' % ssid)        
        
        db.close()
        f.close()

    # Load networks from db
    # Open db (assumes it exists at this point)
    f = open("networkdb", "r+b")
    db = btree.open(f)
    # Retrieve all network, convert to list of dicts
    networks = []
    for key in db:
        data = ujson.loads(db[key])
        networks.append(Network(key.decode("utf-8"), data['strength'], data['pwd'], data['connected']))
    db.close()
    f.close()
    #TODO: sort network list
    # networks.sort(key=lambda n:(str(n['connected']), n['pwd'], n['strength'], n['ssid']), reverse=True)

    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "networks.html", (networks,))
    
# When network list changes push updates to page
@app.route("/networks.json")
def push_data(req, resp):
    jsonData = {}
    encoded = ujson.dumps(jsonData)
    yield from picoweb.start_response(resp, content_type = "application/json")
    yield from resp.awrite(encoded)
    
@app.route("/logging", methods=['GET','POST'])
def logging(req, resp):
    f = open("loggerdb", "r+b")
    db = btree.open(f)
    if req.method == 'POST':
        yield from req.read_form_data()
        service = req.form.get('service')[0]
        db["service"] = service
        if service == "thingspeak":
            db[b"thingspeak"] = ujson.dumps({
                "name": "ThingSpeak",
                "key": req.form.get('ts_key')[0]
            })
        elif service == "awsiot":
            db[b"awsiot"] = ujson.dumps({
                "name": "Amazon Web Service, IoT",
                "cert": req.form.get('cert')[0],
                "key": req.form.get('aws_key')[0],
                "subdomain": req.form.get('subdomain')[0],
                "region": req.form.get('region')[0],
            })
        db.close()
        f.close()    
        yield from resp.awrite("HTTP/1.0 308 Redirect\r\n")
        yield from resp.awrite("Location:/ \r\n")
    else:
        service = db['service'].decode('utf-8')
        thingspeak = ujson.loads(db['thingspeak'])
        awsiot = ujson.loads(db['awsiot'])
        db.close()
        f.close()    
        yield from picoweb.start_response(resp)
        yield from app.render_template(resp, "logging.html",(thingspeak, awsiot, service))

@app.route("/hardware")
def device(req, resp):
    alert = Alert()
    if req.method == 'POST':
        yield from req.read_form_data()
        # Validate data
        valid = True
        fields = ['ECI1_CRC1','ECI1_CRC2','ECI1_Gain','ECI1_Ugain','ECI2_CRC1','ECI2_CRC2','ECI2_Gain','ECI2_Ugain']
        for field in fields:
            input = req.form.get(field)[0] or ''
            try:
                int(input)
            except:
                valid = False
        if valid:
            f = open("configdb", "r+b")
            db = btree.open(f)
            
            db[b"ECI1"] = ujson.dumps({
                "Name": "ECI1",
                "CRC1": req.form.get('ECI1_CRC1')[0],
                "CRC2": req.form.get('ECI1_CRC2')[0],
                "Gain": req.form.get('ECI1_Gain')[0],
                "Ugain": req.form.get('ECI1_Ugain')[0],
            })
            db[b"ECI2"] = ujson.dumps({
                "Name": "ECI2",
                "CRC1": req.form.get('ECI2_CRC1')[0],
                "CRC2": req.form.get('ECI2_CRC2')[0],
                "Gain": req.form.get('ECI2_Gain')[0],
                "Ugain": req.form.get('ECI2_Ugain')[0],
            })
            
            db.close()
            f.close()
            
            # Redirect to homepage
            yield from resp.awrite("HTTP/1.0 308 Redirect\r\n")
            yield from resp.awrite("Location:/ \r\n")
            return
        else:
            alert.type= 'failure'
            alert.message = '<p>Only integers please. Your settings have not been saved.</p>'

    f = open("configdb", "r+b")
    db = btree.open(f)
    config = [ujson.loads(db['ECI1']),ujson.loads(db['ECI2'])]
    db.close()
    f.close()
    
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "hardware.html",(config, alert))

@app.route("/firmware")
def device(req, resp):
    f = open("configdb", "r+b")
    db = btree.open(f)
    version = db['version'].decode('utf-8')
    latest = db['latest'].decode('utf-8')
    db.close()
    f.close()
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "firmware.html",(version, latest))
import logging
logging.basicConfig(level=logging.INFO)

#app.run(debug=True)
app.run(debug=True, host = "192.168.178.43")