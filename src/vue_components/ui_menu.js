var sitemenu = {
    components: {
        'block': block,
    },
    props: {
        config: Object,
        networks: Object
    },
    template:`
        <block>
            <template slot="header">Menu</template>
            <template slot="main">
                <ul class="navlist">
                    <li>
                        <router-link 
                            :to="{name:'menu', params:{ networks:networks, config:config }}"
                        >Main menu</router-link>
                    </li>
                    <li>
                        <router-link 
                            :to="{name:'network_list', params:{ networks:networks }}"
                        >Networks</router-link>
                    </li>
                    <li>
                        <router-link 
                            :to="{name:'ui_logging', params:{ networks:networks }}"
                        >Data logging</router-link>
                    </li>
                    <li>
                        <router-link 
                            :to="{name:'ui_device', params:{ config:config }}"
                        >Device</router-link>
                    </li>
                </ul>
            </template>
        </block>
    `
}