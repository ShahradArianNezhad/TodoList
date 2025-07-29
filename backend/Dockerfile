FROM node:24-alpine

WORKDIR /usr/src/app/backend

COPY ./package*.json .
COPY ./tsconfig.json .

RUN npm install

COPY . .


CMD ["npm", "run","dev"]