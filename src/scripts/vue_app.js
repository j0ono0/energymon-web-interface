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
    },
    methods:{
        
    },
    created: function(){

    },
})
