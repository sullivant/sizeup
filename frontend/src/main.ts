import './assets/main.css'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion';

import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon, faCloudShowersHeavy, faCloudBolt, faSmog, faBed,
    faFire, faTruck as fasTruck, faCar, faRoadBarrier, faFireExtinguisher,
    faPerson, faWater, faExclamation, faBoltLightning, faMapPin, faTornado
} from '@fortawesome/free-solid-svg-icons';
import { faSun as farSun, faSquare, faSquareCheck, faSnowflake, faAlarmClock, 
    faCalendarDays, faTruck, faRectangleList, faLifeRing, 
    faCloud, faLightbulb
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSun, farSun, faMoon, faSquare, faSquareCheck, faSnowflake, 
    faCloudBolt, faSmog, faCloudShowersHeavy, faAlarmClock, faBed, 
    faCalendarDays, faTruck, fasTruck, faRectangleList, faLifeRing, 
    faFire, faCar, faRoadBarrier, faCloud, faFireExtinguisher, faPerson,
    faWater, faExclamation, faLightbulb, faBoltLightning, faMapPin,
    faTornado
);

// Create the app and include the font awesome component stuff
createApp(App)
    .use(MotionPlugin)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
