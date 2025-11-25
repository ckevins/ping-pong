import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Aura from '@primeuix/themes/aura';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});

app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Divider', Divider);

app.mount("#app");
