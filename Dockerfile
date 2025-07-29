FROM node:24-alpine

WORKDIR /usr/src/app/backend

COPY ./backend/package*.json .
COPY ./backend/tsconfig.json .

RUN npm install

COPY ./backend .


CMD ["npm", "run","dev"]