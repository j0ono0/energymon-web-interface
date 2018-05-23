Vue.component('form-network',{
    data: function(){
        return {
            ssid : '',
            pwd  : ''
        }
    },
    methods:{
        update_form(network){
            if(network){
                this.ssid = network.name;
                this.pwd = network.pwd;
            }else{
                this.ssid = '';
                this.pwd = '';
            }
        }
    },
    created: function(){
        eventHub.$on('network_selected', this.update_form);
    },
    template:`
        <form id="form form__network">
            <p>
                <label>
                    Network name (SSID) <input type="text" v-model="ssid">
                </label>
            </p>
            <p>
                <label>
                    Password <input type="password" v-model="pwd">
                </label>
            </p>
            
            <p><button>Cancel</button> <button>Save</button></p>
        </form>
    `
});