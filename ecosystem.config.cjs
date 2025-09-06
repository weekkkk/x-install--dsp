module.exports = {
  apps: [
    {
      name: "XInstallDSP",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
