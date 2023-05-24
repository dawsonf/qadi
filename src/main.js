import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { applicationIcons, ethereum } from '@formkit/icons'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import Home from './views/Home.vue'
import About from './views/About.vue'

//import Datepicker from '@vuepic/vue-datepicker';

import Datepicker from '@vuepic/vue-datepicker';

import './assets/main.css'
//import '@vuepic/vue-datepicker/dist/main.css';

const routes = [
    { name: 'home', path: '/:i?', component: Home },
    { name: 'about', path: '/about', component: About },
  ]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })
  

const app = createApp(App);
app.use(plugin, defaultConfig({
  theme: 'genesis', // will load from CDN and inject into document head
  icons: {
    ...applicationIcons, // spread an entire group of icons
    ethereum, // or add single icons
  }
}));
//app.component('Datepicker', Datepicker);

app.use(router);

app.mount('#app')
