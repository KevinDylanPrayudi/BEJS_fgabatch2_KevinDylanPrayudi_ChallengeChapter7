import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBell } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBell)

import router from './router'

createApp(App)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueCookies)
    .use(router)
    .mount('#app')
