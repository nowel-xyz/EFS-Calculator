FROM node:18-slim

WORKDIR /data

COPY package*.json ./

RUN npm install
RUN npm run build

ENTRYPOINT ["/entry.sh"]

CMD ["npm run start"]