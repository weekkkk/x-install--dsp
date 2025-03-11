export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui"],
  tailwindcss: {
    cssPath: "~/src/app/assets/css/tailwind.css",
  },
  ui: {
    global: true,
  },
  colorMode: {
    preference: "dark",
  },
  icon: {
    customCollections: [
      {
        prefix: "xi",
        dir: "./src/app/assets/icons",
      },
    ],
  },
  dir: {
    pages: "./src/app/routes",
    layouts: "./src/app/layouts",
    assets: "./src/app/assets",
    middleware: "./src/app/middlewares",
  },
  imports: {
    dirs: [
      "./src/shared/*/index.ts",
      "./src/entities/*/*/index.ts",
      "./src/features/*/*/index.ts",
      "./src/widgets/*/*/index.ts",
      "./src/pages/*/*/index.ts",
    ],
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "/fonts/pp-neue-montreal/pp-neue-montreal.style.css",
        },
      ],
    },
  },
  components: {
    dirs: [
      {
        path: "~/src/shared",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          component.pascalName = "Ui" + component.pascalName;
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
      {
        path: "~/src/entities",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
      {
        path: "~/src/entities",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          component.pascalName = component.pascalName + "Feature";
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
      {
        path: "~/src/features",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          component.pascalName = component.pascalName + "Feature";
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
      {
        path: "~/src/widgets",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          component.pascalName = component.pascalName + "Widget";
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
      {
        path: "~/src/pages",
        extendComponent(component) {
          component.pascalName = component.pascalName.replaceAll("Ui", "");
          return component;
        },
        pattern: "**/*index.vue",
        extensions: ["vue"],
      },
    ],
  },
  generate: {
    routes: [
      "/users?mode=view",
      "/users?mode=del",
    ],
  },
  nitro: {
    devProxy: {
      "/server": {
        target: "https://xinstallbotprofile-production.up.railway.app/api",
        changeOrigin: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    },
  },
});
