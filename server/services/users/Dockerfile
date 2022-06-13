#Base Image
FROM node:16.4.2

WORKDIR /usr/local/user

ENV PORT = 4000
ENV MONGO_URI=mongodb+srv://doffy13:afterlife13@cluster0.5hnok.mongodb.net/myFirstDatabase
COPY package.json package-lock.json /usr/local/user/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
