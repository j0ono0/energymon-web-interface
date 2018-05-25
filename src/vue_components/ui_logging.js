var ui_logging = {
    components: {
        'block': block,
        'form_logging': form_logging
    },
    props: {
        items: Array,
        content_key: String
    },
    template:`
        <block>
            <template slot="header">Data logging</template>
            <template slot="main">
                <form_logging></form_logging>
            </template>
        </block>
    `
}