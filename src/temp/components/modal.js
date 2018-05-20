"use strict";

Vue.component('modal', {
  props: {
    heading: { required: true },
    contenturl: {},
    isActive: { default: false }
  },
  computed: {
    classes: function classes() {
      var classes = ["modal"];
      if (this.isActive) {
        classes.push("active");
      }
      return classes.join(' ');
    },
    href: function href() {
      return "#" + this.tabIndex;
    }
  },
  template: "\n        <transition name=\"modal\">\n            <div class=\"modal-mask\">\n              <div class=\"modal-wrapper\">\n                <div class=\"modal-container\">\n\n                  <div class=\"modal-header\">\n                    <slot name=\"header\">\n                      default header\n                    </slot>\n                  </div>\n\n                  <div class=\"modal-body\">\n                    <slot name=\"body\">\n                      default body\n                    </slot>\n                  </div>\n\n                  <div class=\"modal-footer\">\n                    <slot name=\"footer\">\n                      default footer\n                      <button class=\"modal-default-button\" @click=\"$emit('close')\">\n                        OK\n                      </button>\n                    </slot>\n                  </div>\n                </div>\n              </div>\n            </div>\n        </transition>\n    "
});