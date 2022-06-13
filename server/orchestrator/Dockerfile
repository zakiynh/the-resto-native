#Base Image
FROM node:16.4.2

WORKDIR /usr/local/orchestrator

COPY package.json package-lock.json /usr/local/orchestrator/

RUN npm install && npm cache clean --force

ENV PASSWORD=ltZQGRsL0lE77Ujm8nBhWbfKUcK2pFeV

COPY ./ ./

CMD ["npm", "run", "start"]
