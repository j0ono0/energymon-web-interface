
Vue.component('navlist-item',{
    props:{
        content: [String, Number],
        href: [String]
    },
    template:`
        <li>
            <a :href="href">{{ content }}</a>
        </li>
    `
});



Vue.component('navlist',{
    props: {
        items: Array,
        content_key: String
    },
    methods:{
        getContent: function(item){
            console.log(item);
            return item[this.content_key]; 
        }
    },
    template:`
        <ul class="navlist">
            <navlist-item 
                v-for = "item in items" 
                :key="item.id"
                :content = "getContent(item)"
                href = "#"
            ></navlist-item>
        </ul>
    `
});