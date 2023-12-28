FROM node:latest

COPY . /app

WORKDIR /app/project/app

RUN npm install

CMD bash -c "node server.js & npm start"