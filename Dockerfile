FROM node:20.11.1-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
EXPOSE 8080
CMD ["yarn", "start"]
