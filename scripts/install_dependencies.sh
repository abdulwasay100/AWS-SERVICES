#!/bin/bash
cd /home/ubuntu/AWS-SERVICES

# NVM aur Node path ko force load karne ke liye yeh 3 lines sabse zaroori hain
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Ab npm bina kisi error ke chalega
npm install --production
