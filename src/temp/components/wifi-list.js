'use strict';

Vue.component('wifi-list', {
    props: {
        networks: Array
    },
    data: function data() {
        return {
            message: "Locating WiFi networks..."
        };
    },
    methods: {
        link_activated: function link_activated(netid) {
            eventHub.$emit('network_select', netid);
        }
    },
    computed: {
        sorted_networks: function sorted_networks() {

            // Sort 1)connected, 2)remembered, 3)visible
            this.networks.sort(function (a, b) {
                // Connected
                if (a.connected === true) {
                    return 0;
                } else if (b.connected === true) {
                    return 1;
                }
                // Has pwd
                if (a.pwd) {
                    return 0;
                } else if (b.pwd) {
                    return 1;
                }
                return 0;
            });
            return this.networks;
        }

    },
    template: ' \n        <div class="wifilist">\n            <ul class="navlist">\n                <li v-for="(network, key) in sorted_networks">\n                    <a v-on:click.prevent="link_activated(key)" href="#">\n                        {{ network.name }}\n                        <span v-if="network.connected" class="details"> Connected</span>\n                        <span v-else-if="network.pwd" class="details"> Remembered</span>\n                    </a>\n                </li>\n            </ul>\n            <ul class="navlist">\n                <li>\n                    <a href="#">[+] Add network</a>\n                </li>\n            </ul>\n            \n        </div>\n    '
});