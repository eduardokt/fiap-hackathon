# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /var/www/client

# add `/node_modules/.bin` to $PATH
ENV PATH /var/www/client/node_modules/.bin:$PATH

# install and cache app dependencies
ADD ./ /var/www/client
RUN rm -rf /var/www/client/node_modules
RUN npm install

# start app
CMD ["npm", "run", "start"]

EXPOSE 8080
