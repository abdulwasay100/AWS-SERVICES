#!/bin/bash
# Poore path ke sath bina sudo ke pm2 chalaein
/usr/bin/pm2 stop "my-node-app" || true
/usr/bin/pm2 delete "my-node-app" || true
