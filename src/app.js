import './component/car-configuration-list.js'
import './component/car-configuration-edit.js'
import {Router} from "@vaadin/router";


const outlet = document.querySelector('output');
const router = new Router(outlet);




router.setRoutes([
    {path: '/', component: 'car-configuration-list'},
    {path: '/add', component: 'car-configuration-edit'},
    {path: '/edit/:configurationId', component: 'car-configuration-edit'},

]);



export { router};
