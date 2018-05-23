
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

Vue.component('form-logging',{
    data: function(){
        return {
            service : '-- No service selected --',
            ts_APIkey  : '',
            aws_subdomain: '',
            aws_region: ''
        }
    },
    template:`
        <form id="form form__logging">
            <p>
                <label>
                    Logging service
                    <select v-model="service">
                        <option>-- No service selected --</option>
                        <option>ThingSpeak</option>
                        <option>AWS IoT</option>
                    </select>
                </label>
            </p>
            
            <p v-if="service=='ThingSpeak'">
                <label>
                    API Key <input type="text" v-model="ts_APIkey">
                </label>
            </p>
            <template v-if="service=='AWS IoT'">
                <p>
                    <label>
                        Certificate <input type="file">
                    </label>
                </p>
                <p>
                    <label>
                        Private key <input type="file">
                    </label>
                </p>
                <p>
                    <label>
                        Endpoint subdomain <input type="text" v-model="aws_subdomain">
                    </label>
                </p>
                <p>
                    <label>
                        Endpoint region <input type="text" v-model="aws_region">
                    </label>
                </p>
            </template>
            <p><button>Cancel</button> <button>Save</button></p>
        </form>
    `
});