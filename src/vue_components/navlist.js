
var navlistItem = {
    props:{
        content: [String, Number],
        href: [String]
    },
    methods:{
        nav: function(val){
            eventHub.$emit('nav',val);
        }
    },
    template:`
        <li>
            <a 
                v-on:click.prevent="nav(content)"
                :href="href"
            >
                {{ content }}
            </a>
        </li>
    `
};

var navlist = {
    components: {
        'navlist-item': navlistItem
    },
    props: {
        items: Array,
        content_key: String
    },
    methods:{
        getContent: function(item){
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
};