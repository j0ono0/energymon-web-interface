'use strict';

Vue.component('form-device', {
    props: {
        config: Object
    },
    template: '\n        <form id="form form__device">\n            <fieldset v-for="(vals, section) in config">\n                <h2>{{ section }}</h2>\n                <template v-for="(val, key) in vals"> \n                    <p>\n                        <label>\n                        {{ key }} <input type="number" v-model="config[section][key]">\n                        </label>\n                    </p>\n                </template>\n            </fieldset>\n        </form>\n    '
});