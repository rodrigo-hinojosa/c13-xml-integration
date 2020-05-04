FROM node:12.13

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN git clone https://github.com/rodrigo-hinojosa/c13-xml-integration .

USER node

RUN npm i && echo key.ppk > /home/node/app/id_rsa.ppk

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "prod" ]