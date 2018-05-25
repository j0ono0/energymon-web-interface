var form_network = {
    props:{
        //network: Object
    },
    data: function(){
        return {
            ssid:       '',
            pwd :       '',
            network:    {},
        }
    },
    methods:{
        update_form(network){
            if(network){
                this.ssid = network.name;
                this.pwd = network.pwd;
                this.network = network;
            }else{
                this.ssid = '';
                this.pwd = '';
                this.network = {};
            }
        }
    },
    created: function(){
        eventHub.$on('network_selected', this.update_form);
    },
    computed:{
        btn_text: function(){
            if(this.network.connected === true){
                return "Forget";
            }
            return "Connect";
        },
        formValid: function(){
            if(this.network.name){
                return true;
            }
            return false;
        },
    },
    template:`
        <form id="form form__network">
            <p>
                <label>
                    Network name (SSID) <input type="text" v-model="network.name">
                </label>
            </p>
            <p>
                <label>
                    Password <input type="password" v-model="network.pwd">
                </label>
            </p>
            
            <p><button>Cancel</button> <button v-bind:disabled="!formValid">{{ btn_text }}</button></p>
        </form>
    `
}