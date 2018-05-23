'use strict';

Vue.component('wifi-list', {
    props: {
        networks: Object
    },
    data: function data() {
        return {
            message: "Locating WiFi networks..."
        };
    },
    methods: {
        link_activated: function link_activated(network) {
            eventHub.$emit('network_selected', network);
        }
    },
    computed: {
        sorted_networks: function sorted_networks() {
            //Container to merge found and saved network lists
            var netlist = [];
            for (i = 0; i < this.networks.found.length; i++) {
                netlist.push(this.networks.found[i]);
            }

            //Extract list of network names for easier cross-checking
            var names = [];
            for (i = 0; i < this.networks.found.length; i++) {
                names.push(netlist[i].name);
            }
            ;
            //Merge saved networks into netlist 
            for (var i = 0; i < this.networks.saved.length; i++) {
                var index = names.indexOf(this.networks.saved[i].name);
                if (index === -1) {
                    netlist.push(this.networks.saved[i]);
                    names.push(this.networks.saved[i].name);
                } else {
                    for (prop in this.networks.saved[i]) {
                        Vue.set(netlist[index], prop, this.networks.saved[i][prop]);
                    };
                }
            }

            // Sort netlist: 1)connected 2)remembered 3)visible
            netlist.sort(function (a, b) {
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

            return netlist;
        }
    },
    template: ' \n        <div class="wifilist">\n            <ul class="navlist">\n                <li \n                    v-for="(network, key) in sorted_networks"\n                >\n                    <a \n                        v-on:click.prevent="link_activated(network)" href="#"\n                    >\n                        {{ network.name }}\n                        <span v-if="network.connected" class="details"> Connected</span>\n                        <span v-else-if="network.pwd" class="details"> Remembered</span>\n                    </a>\n                </li>\n            </ul>\n            <ul class="navlist">\n                <li>\n                    <a v-on:click.prevent="link_activated(key)" href="#">[+] Add network</a>\n                </li>\n            </ul>\n            \n        </div>\n    '
});