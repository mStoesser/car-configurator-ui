import {html, render} from "lit-html";
import {deleteCarConfiguration, listCarConfigurations} from "../service/car-configurator";
import {Router} from "@vaadin/router";
import {priceFormat} from "../service/util";

class CarConfigurationList extends HTMLElement {

    configurations = []

    connectedCallback() {
        this.load()
        this.render()
    }

    load() {
        listCarConfigurations().then(configurations => {
            this.configurations = configurations
            this.render();
        })
    }

    render() {
        render(html`
            <h1>Car Configurator</h1>
            <button @click="${_=>Router.go(`/add/`)}"><span class="material-symbols-outlined">add</span></button>
            <div class="configuration list">
                ${this.configurations.map(configuration => html`
                    <p>${configuration.name} ${configuration.type} ${configuration.klass}
                        ${configuration.configurationValues.map(v => v.value).join(', ')}
                        <span class="price">${priceFormat.format(configuration.price)}</span>
                    </p>
                    <button @click="${_=>Router.go(`/edit/${configuration.id}`)}"><span class="material-symbols-outlined">edit</span></button>
                    <button @click="${_=>this.deleteConfiguration(configuration.id)}"><span class="material-symbols-outlined">delete</span></button>
                `)}
            </div>
        `, this)
    }

    deleteConfiguration(id) {
        if (confirm(`Really delete configuration?`)) {
            deleteCarConfiguration(id).then(_=>this.load())
        }
    }
}

customElements.define("car-configuration-list", CarConfigurationList)