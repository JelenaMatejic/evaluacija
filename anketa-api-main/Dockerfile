## Using Node:10 Image Since it contains all
## the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
## First Stage : to install and build dependences
#
#FROM node:16 AS builder
#WORKDIR /app
#COPY ./package.json ./
#RUN yarn install
#COPY . .
#RUN npm run build
#
#
## Second Stage : Setup command to run your app using lightweight node image
#FROM node:16-alpine
#WORKDIR /app
#COPY --from=builder /app ./
#COPY --from=builder /app/dist ./dist
#EXPOSE 3001
#CMD ["npm", "run", "start:prod"]
#

FROM node:16 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
