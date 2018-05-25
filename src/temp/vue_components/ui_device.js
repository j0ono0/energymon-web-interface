'use strict';

var ui_device = {
    components: {
        'block': block
    },
    props: {
        config: Object
    },
    computed: {
        formValid: function formValid() {
            for (item in this.config.settings) {
                for (key in this.config.settings[item]) {
                    if (isNaN(this.config.settings[item][key]) || this.config.settings[item][key] == '') return false;
                }
            }
            return true;
        }
    },
    template: '\n         <block>\n            <template slot="header">Device configuration</template>\n            \n            <template slot="main">\n                <form class="form form__device">\n                    <fieldset v-for="(vals, section) in config.settings">\n                        <h2>{{ section }}</h2>\n                        <template v-for="(val, key) in vals"> \n                            <p>\n                                <label>\n                                {{ key }} <input type="text" v-model="config.settings[section][key]">\n                                </label>\n                            </p>\n                        </template>\n                    </fieldset>\n                    <p><button>Cancel</button> <button v-bind:disabled="!formValid">Save</button></p>\n                </form>\n                <form class="form form__firmaware">\n                    <p>Current firmware version: {{ config.firmware }}</p>\n                    <p><button>Update firmware</button></p>\n                </form>\n            </template>\n        </block>\n    '
};