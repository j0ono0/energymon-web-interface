import picoweb
import uasyncio
import ure as re
import ujson


# Temporary data
import temp_data
network_list = temp_data.networks(temp_data.wifi_1)

app = picoweb.WebApp(__name__)

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "index.html", (network_list[0], temp_data.active_logger, temp_data.version))

@app.route("/networks", methods=['GET', 'POST'])
def networks(req, resp):
    if(req.method == 'POST'):
        # Process form
        yield from req.read_form_data()
        ssid = req.form.get('ssid')[0]
        pwd = req.form.get('pwd')[0]
        print('*'*20)
        if req.form.get('connect'):
            print('connect to network: %s / pwd:%s' %(ssid,pwd))
        elif req.form.get('forget'):
            print('Forget network: %s ' % ssid)
        print('*'*20)
    
    # TODO: 
    # Retrieve found and saved networks.
    # Attempt to connect to saved network/s
    # Merge lists and pass to template
    
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "networks.html", (network_list,))
   

# When network list changes push updates to page
@app.route("/networks.json")
def push_data(req, resp):
    jsonData = temp_data.wifi_2
    encoded = ujson.dumps(jsonData)
    yield from picoweb.start_response(resp, content_type = "application/json")
    yield from resp.awrite(encoded)
    
@app.route("/logging")
def logging(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "logging.html",(temp_data.log_ts, temp_data.log_aws,temp_data.active_logger))

@app.route("/hardware")
def device(req, resp):
    alert = temp_data.Alert()
    if req.method == 'POST':
        alert.type = 'success'
        alert.message = '<p>The hardware settings have been applied. Try setting a non-integer to see a failure alert.<p>'
        fields = ['ECI1_crc1','ECI1_crc2','ECI1_gain','ECI1_ugain','ECI2_crc1','ECI2_crc2','ECI2_gain','ECI2_ugain']
        input = ''
        print('*'*20)
        print('Save and apply settings:')
        yield from req.read_form_data()
        for field in fields:
            input = req.form.get(field)[0]
            print('update %s: %s'%(field, input))
            try:
                int(input)
            except:
                alert.type= 'failure'
                alert.message = '<p>Only integers please. Your settings have not been saved.</p>'
        print('*'*20)

    # TODO validate data and include failure alert message
    
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "hardware.html",(temp_data.config, alert))

@app.route("/firmware")
def device(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "firmware.html",(temp_data.version, temp_data.latest))
import logging
logging.basicConfig(level=logging.INFO)

app.run(debug=True)