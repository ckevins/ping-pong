import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import "./style.scss";
import router from "./router";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Aura from '@primeuix/themes/aura';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import IftaLabel from 'primevue/iftalabel';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
});

app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Divider', Divider);
app.component('Dialog', Dialog);
app.component('Chart', Chart);
app.component('Menubar', Menubar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('IconField', IconField);
app.component('IftaLabel', IftaLabel);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('RadioButton', RadioButton);
app.component('ToggleSwitch', ToggleSwitch);

app.mount("#app");
