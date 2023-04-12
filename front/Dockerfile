FROM node:16-alpine as build

WORKDIR /front

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]