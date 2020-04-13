FROM node:12.13

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN git clone https://github.com/rodrigo-hinojosa/c13-xml-integration .

USER node

RUN npm install && npm run build

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "./build/server/server.js" ]