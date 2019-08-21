# No bash, can still use once confident
FROM node:alpine
RUN npm install -g nodemon
RUN mkdir -p /app/server
WORKDIR /app/server
COPY package*.json /app/server/
RUN npm install
COPY . /app/server/

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev
