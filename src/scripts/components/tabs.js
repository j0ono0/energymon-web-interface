
Vue.component('tab',{
    props:{
        tabIndex: { required: true },
        name: { required: true },
        isActive: {default: false}
    },
    computed:{
        classes: function(){
            var classes = ["tabs__tab"];
            if(this.isActive){
                classes.push("active");
            }
            return classes.join(' ');
        },
        href: function(){
            return "#" + this.tabIndex;
        },
    },
    template:`
        <a 
            :class="classes" 
            :href="href"
            v-on:click.stop="$emit('updatetabs',tabIndex)"
        >
            {{ name }}
        </a>
    `
});


Vue.component('tabs',{
    props:{
        tabs: Array
    },
    data:function(){
        return{
            tabStatus: []
        }
    },
    methods:{
        updatetabs: function(tabindex){
            var newTabStatus = Array(this.$children.length);
            newTabStatus[tabindex] = true
            this.tabStatus = newTabStatus;
        },
    },
    mounted: function(){
        this.updatetabs(0);
    },
    template:`
        <nav class="tabs" >
            <tab 
                v-for="(tab,i) in tabs" 
                :key="i"
                :name="tab.name" 
                :isActive="tabStatus[i]"
                :tabIndex="i" 
                @updatetabs="updatetabs"
            ></tab>
        </nav>
    `
});