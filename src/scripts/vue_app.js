
// eventHub: Common communication channel for components
var eventHub = new Vue()

var app = new Vue({
    el: '#application',
    data: {
        message: 'Replace this message!',
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
        networks:{"saved":[],"found":[]}
    },
    methods:{
        fetchData: function(url,callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(){
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        var response = JSON.parse(httpRequest.responseText);
                        callback(response);
                    } else {
                        //TO-DO: add alert UI for end user
                        console.log('failed to get json feed.');
                    }
                }
            }.bind(this);
            httpRequest.open('GET', url);
            httpRequest.send();
        },
        set_networks: function(response){
            this.networks = response;
        },
    },
    created: function(){
        this.fetchData('/networks.json', this.set_networks);
        
    },
})
