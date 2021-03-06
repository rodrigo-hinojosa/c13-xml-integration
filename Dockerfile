FROM node:12.13

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN git clone https://github.com/rodrigo-hinojosa/c13-xml-integration .

USER node

RUN npm i

COPY --chown=node:node . .

COPY key.ppk ./id_rsa.ppk

EXPOSE 8080

CMD [ "npm", "run", "prod" ]
