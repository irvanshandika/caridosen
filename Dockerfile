FROM node:18.19.0
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build