<div ref="acc_{{ network.id }}" class="accordion ani_height">
    <form id="form form__network">
        {% if not network.ssid %}
        <p><label>Name <input name="ssid" type="text"></label></p>
        <p><label>Password <input name="pwd" type="text"></label></p>
        {% else %}
        <p><label>Password <input name="pwd" type="password" value="{{ network.pwd }}"></label></p>
        <input name="ssid" type="hidden" value="{{ network.ssid }}">
        {% endif %}

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