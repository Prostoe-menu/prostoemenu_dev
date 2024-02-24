ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine

WORKDIR /front

COPY package.json .

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]