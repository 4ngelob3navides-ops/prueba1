import { createApp } from 'vue';
import { App } from './App.js';

const mountEl = document.getElementById('cepillo-vue-root');
if (mountEl) {
  createApp(App).mount(mountEl);
}

