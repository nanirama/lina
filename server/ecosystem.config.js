const { createPrivateKey } = require("crypto");

module.exports = {
  apps: [
    {
      name: "Healthgent Server",
      script: "dist/server/src/server.js",
      instances: "max",
      time: true,
      exec_mode: "cluster",
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    production: {
      key: "~/.ssh/ec2private.pem",
      //key: "./hgcerts/healthgent-server.pem",
      user: "ubuntu",
      host: ["ec2-18-206-230-129.compute-1.amazonaws.com"],
      // ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/main",
      repo: "git@github.com:LinaHealth/healthgent.git",
      path: "/home/ubuntu/hgdeploy",
      "pre-deploy-local":
        "scp -i ~/.ssh/ec2private.pem .env.production.local ubuntu@ec2-18-206-230-129.compute-1.amazonaws.com:/home/ubuntu/hgdeploy/source/server",
      "post-deploy":
        "cd server && export $(cat .env.production.local | xargs) && yarn install && NODE_ENV=production knex migrate:up --knexfile src/knexfile.ts && yarn build && pm2 reload ecosystem.config.js --env production --update-env",
    },
    staging: {
      key: "~/.ssh/ec2private.pem",
      user: "ubuntu",
      host: ["ec2-3-230-159-170.compute-1.amazonaws.com"],
      // ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/main",
      repo: "git@github.com:sb-/healthgent.git",
      path: "/home/ubuntu/hgdeploy",
      "pre-deploy-local":
        "scp -i ~/.ssh/ec2private.pem .env.staging.local ubuntu@ec2-3-230-159-170.compute-1.amazonaws.com:/home/ubuntu/hgdeploy/source/server",
      "post-deploy":
        "cd server && export $(cat .env.staging.local | xargs) && yarn install && NODE_ENV=staging knex migrate:up --knexfile src/knexfile.ts && yarn build && pm2 reload ecosystem.config.js --env staging --update-env",
    },
  },
};
