import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from 'mitt';

import '@/assets/scss/reset.scss';

import HeaderSection from '@/components/HeaderSection.vue';
import FilterSection from '@/components/FilterSection.vue';
import SearchSection from '@/components/SearchSection.vue';
import PopularSection from '@/components/PopularSection.vue';
import Card from '@/components/Card.vue';

const emitter = mitt();
const app = createApp(App).use(VueAxios, axios).use(router);
app.config.globalProperties.emitter = emitter;
app.component('HeaderSection', HeaderSection);
app.component('FilterSection', FilterSection);
app.component('SearchSection', SearchSection);
app.component('PopularSection', PopularSection);
app.component('Card', Card);
app.mount('#app');
