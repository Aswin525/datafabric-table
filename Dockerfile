FROM node:22-alpine3.21

WORKDIR /src

RUN npm install -g npm@latest

COPY ./plugins-server /src
COPY ./package.json /src
COPY .npmrc /src

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "index.js"]
