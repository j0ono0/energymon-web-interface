'use strict';

Vue.component('alert', {
    props: {
        message: [String]
    },
    template: '\n        <div class="alert">\n            <p>{{ message }}</p>\n        </div>\n    '
});

var app = new Vue({
    el: '#application',
    data: {
        message: 'Replace this message!',
        showModal: false
    },
    methods: {},
    created: function created() {}
});