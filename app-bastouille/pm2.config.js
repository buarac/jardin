// pm2.config.js
module.exports = {
  apps: [
    // Application web Next.js
    {
      name: "bastouille-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "./",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    },

    // Job météo programmé tous les jours à 4h00
    {
      name: "job-meteo-alimentation",
      script: "curl",
      args: "http://localhost:3000/api/jobs/meteo/alimentation",
      cron_restart: "0 4 * * *", // tous les jours à 04:00
      autorestart: false,
      watch: false
    }
  ]
};