import { createApp } from "vue";
import App from "./App.vue";
import "./style.scss";
import router from "./router";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Aura from '@primeuix/themes/aura';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Chart from 'primevue/chart';
import Menubar from 'primevue/menubar';

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
app.component('Chart', Chart);
app.component('Menubar', Menubar);

app.mount("#app");
