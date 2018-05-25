"use strict";

var block = {
    template: "\n        <div class=\"pagesection\">\n            <div class=\"component\">\n                <div class=\"component__header\">\n                    <h1>\n                    <slot name=\"header\"></slot>\n                    </h1>\n                </div>\n                <slot name=\"main\"></slot>\n                <slot name=\"footer\"></slot>\n            </div>\n        </div>\n    "
};