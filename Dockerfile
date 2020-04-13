FROM node:12.16.2-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./.npmrc ./

RUN npm config set -g production false
RUN npm config set loglevel warn

RUN NODE_ENV=production npm ci

COPY ./ .

EXPOSE 3000

CMD ["node", "./lib/server"]
