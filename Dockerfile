FROM node:0.10-onbuild

WORKDIR /src

# App
ADD . /src
# Install app dependencies
RUN npm install

ENV REDISCLOUD_URL="redis://rediscloud:OMTsqAUCGyZYtRsM@pub-redis-18824.eu-west-1-2.1.ec2.garantiadata.com:18824"
ENV PORT="8080"

EXPOSE 8080

CMD ["npm", "start"]