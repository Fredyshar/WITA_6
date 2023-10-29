const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 360,
    viewportHeight: 720,
    retries: 1,
    setupNodeEvents(on, config) {},
  },
});
