FROM node:12.16.2-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./.npmrc ./

RUN npm config set -g production true
RUN npm config set loglevel warn

RUN NODE_ENV=production npm ci

COPY ./ .

EXPOSE 3000

ENV DEBUG=http,express:*

CMD ["node", "./lib/server"]
