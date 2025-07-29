FROM node:24-alpine

WORKDIR /usr/src/app/frontend

COPY ./package*.json .
COPY ./tsconfig.json .

RUN npm install

COPY . .


CMD ["npm", "run","dev"]