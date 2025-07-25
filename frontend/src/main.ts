import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon, faCloudShowersHeavy, faCloudBolt, faSmog  } from '@fortawesome/free-solid-svg-icons';
import { faSun as farSun, faSquare, faSquareCheck, faSnowflake,  } from '@fortawesome/free-regular-svg-icons';

library.add(faSun, farSun, faMoon, faSquare, faSquareCheck, faSnowflake, faCloudBolt, faSmog, faCloudShowersHeavy);

// Create the app and include the font awesome component stuff
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
