FROM node:18-slim

WORKDIR /data

COPY package*.json ./

RUN npm install
RUN npm run build

CMD ["npm run start"]