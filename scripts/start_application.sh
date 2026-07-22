#!/bin/bash

cd /home/ubuntu/simple_node-for-deployment_purpose
pm2 start npm --name simple-blog -- start
