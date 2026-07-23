#!/bin/bash
export PATH=$PATH:/usr/bin:/usr/local/bin

# Gracefully stop and clean up active processes if they exist
/usr/bin/pm2 stop "my-node-app" || true
/usr/bin/pm2 delete "my-node-app" || true
