'use strict';

var sitemenu = {
    components: {
        'block': block
    },
    props: {
        config: Object,
        networks: Object
    },
    template: '\n        <block>\n            <template slot="header">Menu</template>\n            <template slot="main">\n                <ul class="navlist">\n                    <li>\n                        <router-link \n                            :to="{name:\'menu\', params:{ networks:networks, config:config }}"\n                        >Main menu</router-link>\n                    </li>\n                    <li>\n                        <router-link \n                            :to="{name:\'network_list\', params:{ networks:networks }}"\n                        >Networks</router-link>\n                    </li>\n                    <li>\n                        <router-link \n                            :to="{name:\'ui_logging\', params:{ networks:networks }}"\n                        >Data logging</router-link>\n                    </li>\n                    <li>\n                        <router-link \n                            :to="{name:\'ui_device\', params:{ config:config }}"\n                        >Device</router-link>\n                    </li>\n                </ul>\n            </template>\n        </block>\n    '
};