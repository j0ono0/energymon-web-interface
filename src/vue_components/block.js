var block = {
    template:`
        <div class="pagesection">
            <div class="component">
                <div class="component__header">
                    <h1>
                    <slot name="header"></slot>
                    </h1>
                </div>
                <slot name="main"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    `
}