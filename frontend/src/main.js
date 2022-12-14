import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft,faThumbsUp,faThumbsDown,faXmark,faUser,faRightFromBracket,faPenToSquare,faHouse} from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeft,faThumbsDown,faThumbsUp,faXmark,faUser,faRightFromBracket,faPenToSquare,faHouse)
createApp(App).use(router).component('font-awesome-icon',FontAwesomeIcon).mount('#app')
