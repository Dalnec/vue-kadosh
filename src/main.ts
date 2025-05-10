import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import routes from "@/router/routes";
import { createPinia, type Pinia } from "pinia";
import PrimeVue from "primevue/config";
import AnimateOnScroll from "primevue/animateonscroll";
import BadgeDirective from "primevue/badgedirective";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import FocusTrap from "primevue/focustrap";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import KeyFilter from "primevue/keyfilter";
import CryptoJS from "crypto-js";
import { createPersistedState } from "pinia-plugin-persistedstate";

const SECRET_KEY = "AmoLasTetas";
const app = createApp(App);
const pinia: Pinia = createPinia();

pinia.use(
    createPersistedState({
        auto: true,
        serializer: {
            serialize: (value) => {
                return CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
            },
            deserialize: (value) => {
                try {
                    const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
                    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    return JSON.parse(decrypted);
                } catch (err) {
                    console.error("Error al desencriptar los datos:", err);
                    return {};
                }
            }
        },
        storage: sessionStorage
    })
);


app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("focusTrap", FocusTrap);
app.directive("animateonscroll", AnimateOnScroll);
app.directive("keyFilter", KeyFilter);

app.use(PrimeVue, {
    locale: {
        choose: "Seleccionar",
        dateFormat: "mm/dd/yy",
        dayNames: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        dayNamesShort: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
        emptyMessage: "No hay opciones disponibles",
        fileChosenMessage: "{0} Seleccionados",
        firstDayOfWeek: 0,
        invalidFileTypeMessage: "Archivo no valido",
        monthNames: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
        noFileChosenMessage: "No se ha elegido ningún archivo",
        today: "Hoy",
        weekHeader: "Sem"
    },
    pt: {
        DataTable: {
            root: {
                class: "p-datatable-gridlines p-datatable-striped"
            }
        }
    },
    ripple: true,
    theme: "none"
});

app.use(pinia);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.use(routes);
app.mount("#app");
