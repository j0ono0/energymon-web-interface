import picoweb
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

@app.route(re.compile('^/network/([0-9]+)'))
def network_details(req, resp):
    nid = int(picoweb.utils.unquote_plus(req.url_match.group(1)))
    for network in networks:
        if network.id == nid:
            yield from picoweb.start_response(resp)
            yield from app.render_template(resp, "network_details.html", (network,))

@app.route("/logging")
def logging(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "logging.html")

@app.route("/device")
def device(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "device.html",(temp_data.config, temp_data.version, temp_data.latest))

import logging
logging.basicConfig(level=logging.INFO)

app.run(debug=True)