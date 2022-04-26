import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDog, 
    faCat, 
    faKiwiBird, 
    faMars, 
    faVenus, 
    faThumbsUp, 
    faThumbsDown, 
    faAngleLeft, 
    faAngleRight,
    faHeart,
    faFilter,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as firebase from 'firebase';
import VueMask from 'v-mask';
import VueCarousel from 'vue-carousel';
import VuePwaInstallPlugin from "vue-pwa-install";

Vue.config.productionTip = false
Vue.use(VueMask)
Vue.use(VueCarousel)
Vue.use(VuePwaInstallPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

library.add([
  faDog, faCat, faHeart, faKiwiBird, faMars, faVenus, faThumbsUp, faThumbsDown, faAngleLeft, faAngleRight, faFilter, faSignOutAlt,
])

Vue.component('font-awesome-icon', FontAwesomeIcon)

const firebaseConfig = { 
  apiKey: "AIzaSyAF37qFzu3yY0uSOHkSfaak_uiPslzGP04",
  authDomain: "tcclucas-eb7e3.firebaseapp.com",
  databaseURL: "https://tcclucas-eb7e3-default-rtdb.firebaseio.com",
  projectId: "tcclucas-eb7e3",
  storageBucket: "tcclucas-eb7e3.appspot.com",
  messagingSenderId: "81011716546",
  appId: "1:81011716546:web:bc35b01c22bc814707a65b",
  measurementId: "G-BJ28JGK9TG" 
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if(user.email) {
    localStorage.setItem('login', true)
    if (user.displayName) {
      localStorage.setItem('displayName', user.displayName)
    }
    store.dispatch("fetchUser", user);
  }
});