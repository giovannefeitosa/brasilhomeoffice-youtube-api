#!/bin/bash
# This repo should be set up through the infrastructure of
# github/BrasilHomeOffice/BrasilHomeOffice
# 
# If you want to run outside this infra, you should create
# a Dockerfile and docker-compose.yml
# So you can run this inside your container

docker exec youtube-api-container cd /app && npm run migrate:dev 

