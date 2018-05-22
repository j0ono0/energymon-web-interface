Vue.component('wifi-list',{
    props:{
        networks: Array
    },
    data: function(){
        return{
            message: "Locating WiFi networks...",
        }
    },
    methods:{
        link_activated: function(netid){
            eventHub.$emit('network_select',netid)
        },
    },
    computed:{
        sorted_networks: function(){
           
            // Sort 1)connected, 2)remembered, 3)visible
            this.networks.sort(function(a,b){
                // Connected
                if(a.connected===true){
                    return 0;
                }else if (b.connected===true){
                    return 1;
                }
                // Has pwd
                if(a.pwd){
                    return 0;
                }else if(b.pwd){
                    return 1;
                }
                return 0;
            });
            return this.networks;
        },
        
    },
    template:` 
        <div class="wifilist">
            <ul class="navlist">
                <li v-for="(network, key) in sorted_networks">
                    <a v-on:click.prevent="link_activated(key)" href="#">
                        {{ network.name }}
                        <span v-if="network.connected" class="details"> Connected</span>
                        <span v-else-if="network.pwd" class="details"> Remembered</span>
                    </a>
                </li>
            </ul>
            <ul class="navlist">
                <li>
                    <a href="#">[+] Add network</a>
                </li>
            </ul>
            
        </div>
    `
});