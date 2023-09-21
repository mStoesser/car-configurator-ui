import {html, render} from "lit-html";
import {listCarConfigurations} from "../service/car-configurator";
import {Router} from "@vaadin/router";

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
                    <p>${configuration.name}</p>
                    <button @click="${_=>Router.go(`/edit/${configuration.id}`)}"><span class="material-symbols-outlined">edit</span></button>
                    <button @click="${_=>this.deleteConfiguration()}"><span class="material-symbols-outlined">delete</span></button>
                `)}
            </div>
        `, this)
    }


    deleteConfiguration(id) {
        if(alert(`Really delete configuration?`)) {
            console.log('delete', id)
        }
    }
}

customElements.define("car-configuration-list", CarConfigurationList)