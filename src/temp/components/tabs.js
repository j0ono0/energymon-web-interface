"use strict";

Vue.component('tab', {
    props: {
        tabIndex: { required: true },
        name: { required: true },
        isActive: { default: false }
    },
    computed: {
        classes: function classes() {
            var classes = ["tabs__tab"];
            if (this.isActive) {
                classes.push("active");
            }
            return classes.join(' ');
        },
        href: function href() {
            return "#" + this.tabIndex;
        }
    },
    template: "\n        <a \n            :class=\"classes\" \n            :href=\"href\"\n            v-on:click.stop=\"$emit('updatetabs',tabIndex)\"\n        >\n            {{ name }}\n        </a>\n    "
});

Vue.component('tabs', {
    props: {
        tabs: Array
    },
    data: function data() {
        return {
            tabStatus: []
        };
    },
    methods: {
        updatetabs: function updatetabs(tabindex) {
            var newTabStatus = Array(this.$children.length);
            newTabStatus[tabindex] = true;
            this.tabStatus = newTabStatus;
        }
    },
    mounted: function mounted() {
        this.updatetabs(0);
    },
    template: "\n        <nav class=\"tabs\" >\n            <tab \n                v-for=\"(tab,i) in tabs\" \n                :key=\"i\"\n                :name=\"tab.name\" \n                :isActive=\"tabStatus[i]\"\n                :tabIndex=\"i\" \n                @updatetabs=\"updatetabs\"\n            ></tab>\n        </nav>\n    "
});