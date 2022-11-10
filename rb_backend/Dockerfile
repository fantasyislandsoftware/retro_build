FROM i386/alpine as base

# Install packages
RUN apk add --update npm 
RUN apk add wine nano python3

# Init wine
RUN wine regedit

# Setup node
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .