# Create data sources and populate with sample data
import btree
import ujson

# TODO: Make decorator work
def db_access(db_name):

    def db_decorator(function):
        def wrapper(*args, **kwargs):
            try:
                f = open(db_name, "r+b")
            except OSError:
                f = open(db_name, "w+b")
            db = btree.open(f)
            
            function(db, *args, **kwargs)
            
            db.flush()
            db.close()
            f.close()
        return wrapper
    return db_decorator

def make_networkdb():
    try:
        f = open("networkdb", "r+b")
    except OSError:
        f = open("networkdb", "w+b")

        # Now open a database itself
        db = btree.open(f)

        # The keys you add will be sorted internally in the database
        db[b"blam"] = ujson.dumps({
            "strength":-84,
            "pwd":"",
            "connected": True
        })
        db[b"Telstra2EC8"] = ujson.dumps({
            "strength":-78,
            "pwd":"",
            "connected": False
        })
        db[b"Hal-North"] = ujson.dumps({
            "strength":-84,
            "pwd":"",
            "connected": False
        })
        db[b"myHiddenNetwork"] = ujson.dumps({
            "strength":-91,
            "pwd":"shhhh!",
            "connected": False
        })

        db.close()
        f.close()

def make_loggerdb():
    try:
        f = open("loggerdb", "r+b")
    except OSError:
        f = open("loggerdb", "w+b")
        db = btree.open(f)
        db["service"] = "awsiot"
        db[b"awsiot"] = ujson.dumps({
            "name": "Amazon Web Service, IoT",
            "cert": 12345678,
            "key": "123456g789p",
            "subdomain": "Saturn",
            "region": "Milkyway",
        })
        db[b"thingspeak"] = ujson.dumps({
            "name": "ThingSpeak",
            "key": "123456g789p"
        })

        db.close()
        f.close()

def make_configdb():
    try:
        f = open("configdb", "r+b")
    except OSError:
        f = open("configdb", "w+b")
        db = btree.open(f)
        db[b"version"] = "0.0.1.1"
        db[b"latest"] = "0.0.1.2"
        db[b"ECI1"] = ujson.dumps({
            "Name": "ECI1",
            "CRC1": 1,
            "CRC2": 2,
            "Gain": 3,
            "Ugain": 4,
        })
        db[b"ECI2"] = ujson.dumps({
            "Name": "ECI2",
            "CRC1": 5,
            "CRC2": 6,
            "Gain": 7,
            "Ugain": 8,
        })

        db.close()
        f.close()    