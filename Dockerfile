FROM node:16.8.0-alpine3.14

WORKDIR /app
COPY ./src .
RUN npm install

CMD ["node", "./dist/app.js"]