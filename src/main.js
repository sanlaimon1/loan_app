import { createApp } from 'vue'
import VueSignaturePad from "vue-signature-pad";
import { router } from './routes';
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//mdi font
import '@mdi/font/css/materialdesignicons.css'
import './assets/app.css'

const vuetify = createVuetify({
    components,
    directives,

    icons: {
        defaultSet: 'mdi'
    }

})
createApp(App).use(vuetify).use(router).use(VueSignaturePad).mount("#app");
