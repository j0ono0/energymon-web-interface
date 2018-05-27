import picoweb


app = picoweb.WebApp(__name__)

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from resp.awrite("I can show you a table of <a href='squares'>squares</a>.")

@app.route("/menu")
def squares(req, resp):
    yield from picoweb.start_response(resp)
    yield from app.render_template(resp, "menu.html", (req,))


import logging
logging.basicConfig(level=logging.INFO)

app.run(debug=True)