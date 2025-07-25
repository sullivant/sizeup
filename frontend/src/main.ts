import './assets/main.css'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion';

import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon, faCloudShowersHeavy, faCloudBolt, faSmog, faBed  } from '@fortawesome/free-solid-svg-icons';
import { faSun as farSun, faSquare, faSquareCheck, faSnowflake, faAlarmClock, 
    faCalendarDays, faTruck, faRectangleList, faLifeRing } from '@fortawesome/free-regular-svg-icons';

library.add(faSun, farSun, faMoon, faSquare, faSquareCheck, faSnowflake, 
    faCloudBolt, faSmog, faCloudShowersHeavy, faAlarmClock, faBed, 
    faCalendarDays, faTruck, faRectangleList, faLifeRing);

// Create the app and include the font awesome component stuff
createApp(App)
    .use(MotionPlugin)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
