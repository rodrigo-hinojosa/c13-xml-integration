FROM node:12.13

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN git clone https://github.com/rodrigo-hinojosa/c13-xml-integration .

USER node

RUN npm install && npm install -g pm2

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "run", "prod" ]