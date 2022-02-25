import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faLock
} from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

library.add([
  faLock
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