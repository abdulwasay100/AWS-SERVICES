#!/bin/bash
cd /home/ubuntu/AWS-SERVICES

# 1. Sabse zaroori line: CodeDeploy ki downloaded files ki ownership ubuntu ko dein
sudo chown -R ubuntu:ubuntu /home/ubuntu/AWS-SERVICES

# 2. NVM Environment load karein
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

export PATH=$PATH:/usr/bin:/usr/local/bin

# 3. Ab bina permission error ke install chalega
npm install --omit=dev
