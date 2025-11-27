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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

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
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);

app.mount("#app");
