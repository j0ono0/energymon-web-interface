Vue.component('alert',{
    props:{
        message: [String]
    },
    template:`
        <div class="alert">
            <p>{{ message }}</p>
        </div>
    `
});

var app = new Vue({
    el: '#application',
    data: {
        message: 'Replace this message!',
        showModal: false,
        sitesections:[
            {
                "heading":"Network"
            },{
                "heading":"Logging"
            },{
                "heading":"Device configuration"
            },{
                "heading":"Firmware & information"
            }
        ],
        remembered_networks:[
            {
                "name":"TelstraE2C8",
                "password": "********",
                "connected":true
            }, {
                "name":"Hal-North",
                "password": "********",
                "connected":false
            }, {
                "name":"black-ops_hidden",
                "password": "*************",
                "connected":false
            }
        ]
    },
    methods:{
        
    },
    created: function(){

    },
})
