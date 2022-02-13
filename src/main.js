import { createApp } from "vue";
import { mainDirectives, directives } from "@/directives";
import App from "./App";
import components from "@/components/UI";
import router from "@/router/router";
import store from "@/store";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

mainDirectives.forEach((directive) => {
  app.directive(directive.name, directive);
});

for (const name in directives) {
  app.use(directives[name]);
}

app.use(router).use(store).mount("#app");
