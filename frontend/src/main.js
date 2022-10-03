import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft,faThumbsUp,faThumbsDown,faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeft,faThumbsDown,faThumbsUp,faXmark)
createApp(App).use(store).use(router).component('font-awesome-icon',FontAwesomeIcon).mount('#app')
