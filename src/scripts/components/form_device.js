Vue.component('form-device',{
    props:{
        config: Object
    },
    computed:{
        formValid: function(){
            for(item in this.config.settings){
                for(key in this.config.settings[item]){
                    if(isNaN(this.config.settings[item][key]) || this.config.settings[item][key] == '') return false;
                }
            }
            return true;
        },
    },
    template:`
        <div>
            <form class="form form__device">
                <fieldset v-for="(vals, section) in config.settings">
                    <h2>{{ section }}</h2>
                    <template v-for="(val, key) in vals"> 
                        <p>
                            <label>
                            {{ key }} <input type="text" v-model="config.settings[section][key]">
                            </label>
                        </p>
                    </template>
                </fieldset>
                <p><button>Cancel</button> <button v-bind:disabled="!formValid">Save</button></p>
            </form>
            <form class="form form__firmaware">
                <p>Current firmware version: {{ config.firmware }}</p>
                <p><button>Update firmware</button></p>
            </form>
        </div>
    `
});