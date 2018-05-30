import picoweb
import uasyncio
import ure as re

# Temporary data
import temp_data
networks = temp_data.networks()

app = picoweb.WebApp(__name__)

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "index.html")

@app.route("/networks")
def menu(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "networks.html", (networks,))
   

# When network list changes push updates to page
@app.route("/event")
def push_data(req, resp):
    print("Event source connected")
    yield from resp.awrite("HTTP/1.0 200 OK\r\n")
    yield from resp.awrite("Content-Type: text/event-stream\r\n")
    yield from resp.awrite("\r\n")
    i = 0
    try:
        while True:
            yield from resp.awrite("data: %d\n\n" % i)
            yield from uasyncio.sleep(1)
            i += 1
    except OSError:
        print("Event source connection closed")
        yield from resp.aclose()

@app.route(re.compile('^/network(?:/([0-9]*))?'))
def network_details(req, resp):
    if req.url_match.group(1):
        # Retrieve existing network if it exists
        nid = int(picoweb.utils.unquote_plus(req.url_match.group(1)))
        for n in networks:
            if n.id == nid:
                network = n
    
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "network_details.html", (network,))

@app.route("/logging")
def logging(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "logging.html",(temp_data.log_ts, temp_data.log_aws,temp_data.active_logger))

@app.route("/hardware")
def device(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "hardware.html",(temp_data.config,))

@app.route("/firmware")
def device(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "firmware.html",(temp_data.version, temp_data.latest))
import logging
logging.basicConfig(level=logging.INFO)

app.run(debug=True)