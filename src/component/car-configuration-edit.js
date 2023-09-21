import {html, render} from "lit-html";
import {
    createCarConfiguration,
    listProductAxis,
    listProducts,
    loadCarConfiguration,
    updateCarConfiguration,
    validateCarConfiguration,
} from "../service/car-configurator";
import {Router} from "@vaadin/router";
import {router} from "../app";

class CarConfigurationEdit extends HTMLElement {

    configurationId = null
    configuration = null
    currentPrice = null

    configurationValues = []

    productAxis = []
    products = []

    connectedCallback() {
        this.configurationId = router.location.params.configurationId
        this.load()
        this.render()
    }

    load() {
        listProducts().then(products => {
            this.products = products
            this.render()
        })

        if (this.configurationId) {
            loadCarConfiguration(this.configurationId).then(configuration => {
                this.configuration = configuration
                this.render();
                this.loadProductAxis(this.configuration.productId)
            })
        }
    }
    loadProductAxis(productId) {
        listProductAxis(productId).then(axis => {
            this.productAxis = axis
            this.render()
            this.validate()
        })
    }

    isCreate() {
        return this.configurationId == null
    }

    render() {
        render(html`
            <h1>${this.isCreate() ? 'Add' : 'Edit'} Configuration </h1>
            <div class="configuration edit">
                <label>Name</label>
                <input name="name" value="${this.configuration?.name}">

                <label>Car</label>
                <select name="product" @change="${e=>this.loadProductAxis(e.target.value)}">
                    <option value="" disabled selected></option>
                    ${this.products.map(p =>html`
                        <option value="${p.id}" ?selected="${p.id == this.configuration?.productId}">${p.type} ${p.klass}</option>
                    `)}
                </select>
                
                ${this.productAxis.map(axis => html`
                    <label>${axis.key}</label>
                    <select name="${axis.key}" @change="${_=>this.validate()}" ?multiple="${axis.multipleValues}">
                        ${axis.values.map(v => html`
                            <option ?selected=${this.isConfigurationValueSelected(axis.key, v)}>${v}</option>
                        `)}
                    </select>
                `)}
                <label>Price</label>
                <p>${this.currentPrice}</p>
            </div>
            <button @click="${_=>this.save()}"><span class="material-symbols-outlined">save</span></button>
        `, this)
    }

    validate() {
        validateCarConfiguration(this.getConfigurationFromInput()).then(c => {
            this.currentPrice = c.price;
            this.render()
        })
    }

    isConfigurationValueSelected(axisKey, axisValue) {
        if (this.isCreate()) {
            return this.productAxis.filter(axis => axis.key === axisKey && axis.defaultValue === axisValue).length > 0
        } else {
            return this.configuration.configurationValues.filter(configValue => configValue.key === axisKey && configValue.value === axisValue).length > 0
        }
    }

    save() {
        let configuration = this.getConfigurationFromInput()
        if (this.isCreate()) {
            createCarConfiguration(configuration).then(c=>{
                console.log('created', c)
                Router.go(`/edit/${c.id}`)
            });
        } else {
            updateCarConfiguration(this.configurationId, configuration).then(c=> {
                this.configuration = c;
                this.render();
                console.log('updated', c)
            })
        }
    }

    // This is an example, what you have to do when there is no two-way-binding
    getConfigurationFromInput() {
        const vals = []
        this.productAxis.forEach(a => {
            if (a.multipleValues) {
                Array.from(this.querySelectorAll('select[name=extras] option:checked'))
                    .forEach(o=>vals.push({ key: a.key, value: o.value }))
            } else {
                vals.push({ key: a.key, value: this.querySelector(`select[name=${a.key}]`).value })
            }
        })
        return {
            'productId': this.querySelector('select[name=product]').value,
            'name': this.querySelector('input[name=name]').value,
            "configurationValues": vals
        }
    }

}

customElements.define("car-configuration-edit", CarConfigurationEdit)