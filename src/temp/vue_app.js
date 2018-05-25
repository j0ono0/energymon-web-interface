'use strict';

var router = new VueRouter({
    mode: 'history',
    routes: [{
        name: 'menu',
        path: '/',
        component: sitemenu,
        props: true
    }, {
        name: 'network_list',
        path: '/networks',
        component: network_list,
        props: true
    }, {
        name: 'ui_logging',
        path: '/logging',
        component: ui_logging,
        props: true
    }, {
        name: 'ui_device',
        path: '/device',
        component: ui_device,
        props: true
    }]
});

// eventHub: Common communication channel for components
var eventHub = new Vue();

var app = new Vue({
    el: '#application',
    data: {
        message: 'Replace this message!',
        sitesections: [{
            "heading": "Network"
        }, {
            "heading": "Logging"
        }, {
            "heading": "Device configuration"
        }, {
            "heading": "Firmware & information"
        }],
        networks: {
            "saved": [],
            "found": []
        },
        config: {
            firmware: "0.1.2.3",
            settings: {
                EIC1: {
                    crc1: 7,
                    crc2: 8,
                    gain: 9,
                    ugain: 10
                },
                EIC2: {
                    crc1: 1,
                    crc2: 2,
                    gain: 3,
                    ugain: 4
                }
            }
        }
    },
    methods: {
        fetchData: function fetchData(url, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        var response = JSON.parse(httpRequest.responseText);
                        callback(response);
                    } else {
                        //TO-DO: add alert UI for end user
                        console.log('failed to get json feed.');
                    }
                }
            }.bind(this);
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        set_networks: function set_networks(response) {
            this.networks = response;
        }
    },
    created: function created() {
        this.fetchData('/networks.json', this.set_networks);
    },
    router: router
});