Vue.component('form-device',{
    props:{
        config: Object
    },
    computed:{
        formValid: function(){
            for(item in this.config){
                for(key in this.config[item]){
                    if(isNaN(this.config[item][key]) || this.config[item][key] == '') return false;
                }
            }
            return true;
        },
    },
    template:`
        <form id="form form__device">
            <fieldset v-for="(vals, section) in config">
                <h2>{{ section }}</h2>
                <template v-for="(val, key) in vals"> 
                    <p>
                        <label>
                        {{ key }} <input type="text" v-model="config[section][key]">
                        </label>
                    </p>
                </template>
            </fieldset>
            <p><button>Cancel</button> <button v-bind:disabled="!formValid">Save</button></p>
        </form>
    `
});