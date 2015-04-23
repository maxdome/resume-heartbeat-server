FROM node:0.10-onbuild

WORKDIR /src

# App
ADD . /src
# Install app dependencies
RUN npm install

EXPOSE 8080

CMD ["PORT=8080", "npm", "start"]