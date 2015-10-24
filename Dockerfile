FROM node:4.2.1

COPY . /usr/src/gh-review

WORKDIR /usr/src/gh-review
RUN npm install

ENTRYPOINT bin/gh-review