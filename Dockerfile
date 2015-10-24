FROM node:4.2.1

COPY . /usr/src/gh-review

WORKDIR /usr/src/gh-review
RUN rm -rf node_modules ; npm install

ENTRYPOINT ["node", "gh-review.js"]
CMD []