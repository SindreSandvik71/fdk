FROM node:8-alpine

# to run localhost docker

RUN npm init -y
RUN yarn add ejs express method-override body-parser compression --loglevel error
RUN yarn global add pm2 --loglevel error

# Create app directory
RUN mkdir -p /usr/src/app && chmod 777 /usr/src/app
RUN mkdir /.pm2 && chmod 777 /.pm2
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN yarn install --loglevel=warn
COPY . /usr/src/app/

RUN yarn run build

#RUN yarn test

#ENV NODE_ENV production

EXPOSE 4300

CMD [ "pm2-docker", "start.js" ]
