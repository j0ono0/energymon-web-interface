Vue.component('wifi-list',{

    data: function(){
        return{
            message: "Locating WiFi networks...",
            availableWiFi: [],
        }
    },
    methods:{
        get_wifi: function(url){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function(){
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        var response = JSON.parse(httpRequest.responseText)
                        this.message = null;
                        this.availableWiFi = response.data;
                    } else {
                        this.message = 'There was communication problem whilst contacting your Energymon device. Reload this page to try again.';
                    }
                }
            }.bind(this);
            httpRequest.open('GET', url);
            httpRequest.send();
        },
    },
    created: function(){
        this.get_wifi('/wifi.json');
    },
    template:`
        <div class="wifilist">
            <p v-if="message != null">{{ message }}</p>
            <ul>
                <li v-for="network in availableWiFi">
                    <p>{{ network.name }} ({{ network.strength }})</p>
                </li>
            </ul>
        </div>
    `
});