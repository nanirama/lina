FROM node:16.13.0-alpine as builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ./server/package.json ./server/package.json
COPY ./server/tsconfig.json ./server/tsconfig.json
RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache
COPY ./server ./server
RUN yarn server build
EXPOSE 80
CMD yarn server start:production
