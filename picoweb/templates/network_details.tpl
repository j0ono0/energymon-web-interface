<div ref="acc_{{ network.id }}" class="accordion ani_height">
    <form id="form form__network">
        <p><label>Password <input name="pwd" type="password" value="{{ network.pwd }}"></label></p>
        <input name="ssid" type="hidden" value="{{ network.ssid }}">
        <p>
        {% if network.pwd or network.connected %}
            <a class="button" href="/networks">Forget</a> 
        {% endif %}
        
        {% if not network.connected %}
            <button>Connect</button>
        {% endif %}
        </p>
    </form>
</div>