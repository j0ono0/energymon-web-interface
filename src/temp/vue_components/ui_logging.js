'use strict';

var ui_logging = {
    components: {
        'block': block,
        'form_logging': form_logging
    },
    props: {
        items: Array,
        content_key: String
    },
    template: '\n        <block>\n            <template slot="header">Data logging</template>\n            <template slot="main">\n                <form_logging></form_logging>\n            </template>\n        </block>\n    '
};