<div
    ref="acc_{{ network.id }}" 
    :style="accStyles({{ network.id }})"
    :class="accClasses({{ network.id }})"
>
    <form v-cloak id="form form__network">
        <p><label>Password <input name="pwd" type="password" value="{{ network.pwd }}"></label></p>
        <p>
        
        <input name="ssid" type="hidden" value="{{ network.ssid }}">
        
        {% if network.pwd or network.connected %}
            <a class="button  button--inv" href="/networks">Forget</a> 
        {% endif %}
        
        {% if not network.connected %}
            <button class="button--inv">Connect</button>
        {% endif %}
        </p>
    </form>
</div>