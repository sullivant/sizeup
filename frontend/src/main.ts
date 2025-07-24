import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun,faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSun,faMoon);

// Create the app and include the font awesome component stuff
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
