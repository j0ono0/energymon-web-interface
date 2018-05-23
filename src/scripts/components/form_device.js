Vue.component('form-device',{
    props:{
        config: Object
    },
    template:`
        <div class="component">
        <h1>Device configuration</h1>
            <form id="form form__device">
                <fieldset v-for="(vals, section) in config">
                    <h2>{{ section }}</h2>
                    <template v-for="(val, key) in vals"> 
                        <p>
                            <label>
                            {{ key }} <input type="number" v-model="config[section][key]">
                            </label>
                        </p>
                    </template>
                </fieldset>
                <p><button>Cancel</button> <button>Save</button></p>
            </form>
        </div>
    `
});