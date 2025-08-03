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
  ]
};