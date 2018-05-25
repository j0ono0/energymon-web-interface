'use strict';

var navlistItem = {
    props: {
        content: [String, Number],
        href: [String]
    },
    methods: {
        nav: function nav(val) {
            eventHub.$emit('nav', val);
        }
    },
    template: '\n        <li>\n            <a \n                v-on:click.prevent="nav(content)"\n                :href="href"\n            >\n                {{ content }}\n            </a>\n        </li>\n    '
};

var navlist = {
    components: {
        'navlist-item': navlistItem
    },
    props: {
        items: Array,
        content_key: String
    },
    methods: {
        getContent: function getContent(item) {
            return item[this.content_key];
        }
    },
    template: '\n        <ul class="navlist">\n            <navlist-item \n                v-for = "item in items" \n                :key="item.id"\n                :content = "getContent(item)"\n                href = "#"\n            ></navlist-item>\n        </ul>\n    '
};