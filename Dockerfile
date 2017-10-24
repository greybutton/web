FROM node:8-alpine

RUN apk update && apk add make

WORKDIR /usr/src/app
