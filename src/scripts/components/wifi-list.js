Vue.component('wifi-list',{
    props:{
        networks: Object
    },
    data: function(){
        return{
            message: "Locating WiFi networks...",
        }
    },
    methods:{
        link_activated: function(network){
            eventHub.$emit('network_selected',network)
        },
    },
    computed:{
        sorted_networks: function(){
            //Container to merge found and saved network lists
            var netlist = this.networks.found;
            
            //Extract list of found network names for easier cross-checking
            var found_names = [];
            for(var i=0; i < netlist; i++){
                found_names.push(netlist[i].name);
            }
            
            //Merge saved networks into netlist 
            for(var i=0; i < this.networks.saved.length; i++){
                var j = found_names.indexOf(this.networks.saved[i].name)
                if(j === -1){
                    this.networks.found.push(this.networks.saved[i]);
                }else{
                    Array.prototype.push.apply(this.networks.found[j],this.networks.saved[i]);
                }
            }
            
            // Sort netlist: 1)connected 2)remembered 3)visible
            netlist.sort(function(a,b){
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

            return netlist;
        },
    },
    template:` 
        <div class="wifilist">
            <ul class="navlist">
                <li 
                    v-for="(network, key) in sorted_networks"
                    :key="network.id"
                >{{ key }})
                    <a 
                        v-on:click.prevent="link_activated(network)" href="#"
                    >
                        {{ network.name }}
                        <span v-if="network.connected" class="details"> Connected</span>
                        <span v-else-if="network.pwd" class="details"> Remembered</span>
                    </a>
                </li>
            </ul>
            <ul class="navlist">
                <li>
                    <a v-on:click.prevent="link_activated(key)" href="#">[+] Add network</a>
                </li>
            </ul>
            
        </div>
    `
});