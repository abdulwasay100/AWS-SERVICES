#!/bin/bash
cd /home/ubuntu/AWS-SERVICES
# PM2 ko safely single line mein start ya reload karein
/usr/bin/pm2 start server.js --name "my-node-app" || /usr/bin/pm2 reload "my-node-app"
