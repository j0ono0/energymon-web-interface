<div 
    ref="acc_new" 
    :style="accStyles('new')"
    :class="accClasses('new')"
>
    <form v-cloak  id="form form__network">
        <p><label>Name <input name="ssid" type="text"></label></p>
        <p><label>Password <input name="pwd" type="text"></label></p>
        <p><a class="button button--inv" href="/networks">Cancel</a> <button class="button--inv">Connect</button></p>
    </form>
</div>