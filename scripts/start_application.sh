#!/bin/bash
cd /home/ubuntu/AWS-SERVICES

# Explicitly load NVM environment variables for the ubuntu user
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Fallback paths for PM2 binary location
export PATH=$PATH:/usr/bin:/usr/local/bin

# Start or reload application safely using full pm2 path
/usr/bin/pm2 start server.js --name "my-node-app" || /usr/bin/pm2 reload "my-node-app"
