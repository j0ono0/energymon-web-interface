'use strict';

Vue.component('form-network', {
    data: function data() {
        return {
            ssid: '',
            pwd: ''
        };
    },
    methods: {
        update_form: function update_form(network) {
            if (network) {
                this.ssid = network.name;
                this.pwd = network.pwd;
            } else {
                this.ssid = '';
                this.pwd = '';
            }
        }
    },
    created: function created() {
        eventHub.$on('network_selected', this.update_form);
    },
    template: '\n        <form id="form form__network">\n            <p>\n                <label>\n                    Network name (SSID) <input type="text" v-model="ssid">\n                </label>\n            </p>\n            <p>\n                <label>\n                    Password <input type="password" v-model="pwd">\n                </label>\n            </p>\n            \n            <p><button>Cancel</button> <button>Save</button></p>\n        </form>\n    '
});