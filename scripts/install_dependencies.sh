#!/bin/bash
cd /home/ubuntu/AWS-SERVICES

# Explicitly load NVM environment variables for the ubuntu user
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Fallback path inclusion in case node was installed via apt or binary pack
export PATH=$PATH:/usr/bin:/usr/local/bin

# Run installation smoothly
npm install --production
