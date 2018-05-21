'use strict';

Vue.component('wifi-list', {

    data: function data() {
        return {
            message: "Locating WiFi networks...",
            availableWiFi: []
        };
    },
    methods: {
        get_wifi: function get_wifi(url) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        var response = JSON.parse(httpRequest.responseText);
                        this.message = null;
                        this.availableWiFi = response.data;
                    } else {
                        this.message = 'There was communication problem whilst contacting your Energymon device. Reload this page to try again.';
                    }
                }
            }.bind(this);
            httpRequest.open('GET', url);
            httpRequest.send();
        }
    },
    created: function created() {
        this.get_wifi('/wifi.json');
    },
    template: '\n        <div class="wifilist">\n            <p v-if="message != null">{{ message }}</p>\n            <ul>\n                <li v-for="network in availableWiFi">\n                    <a href="#">{{ network.name }} ({{ network.strength }})</a>\n                </li>\n                \n                <li>\n                    <a href="#">[+] Add network</a>\n                </li>\n            </ul>\n        </div>\n    '
});