
Vue.component('modal',{
    props:{
        heading: { required: true },
        contenturl: {},
        isActive: {default: false},
    },
    computed:{
        classes: function(){
            var classes = ["modal"];
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
        <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                    <slot name="header">
                      default header
                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">
                      default body
                    </slot>
                  </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      default footer
                      <button class="modal-default-button" @click="$emit('close')">
                        OK
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
        </transition>
    `
});
