'use strict';

var form_network = {
    props: {
        //network: Object
    },
    data: function data() {
        return {
            ssid: '',
            pwd: '',
            network: {}
        };
    },
    methods: {
        update_form: function update_form(network) {
            if (network) {
                this.ssid = network.name;
                this.pwd = network.pwd;
                this.network = network;
            } else {
                this.ssid = '';
                this.pwd = '';
                this.network = {};
            }
        }
    },
    created: function created() {
        eventHub.$on('network_selected', this.update_form);
    },
    computed: {
        btn_text: function btn_text() {
            if (this.network.connected === true) {
                return "Forget";
            }
            return "Connect";
        },
        formValid: function formValid() {
            if (this.network.name) {
                return true;
            }
            return false;
        }
    },
    template: '\n        <form id="form form__network">\n            <p>\n                <label>\n                    Network name (SSID) <input type="text" v-model="network.name">\n                </label>\n            </p>\n            <p>\n                <label>\n                    Password <input type="password" v-model="network.pwd">\n                </label>\n            </p>\n            \n            <p><button>Cancel</button> <button v-bind:disabled="!formValid">{{ btn_text }}</button></p>\n        </form>\n    '
};