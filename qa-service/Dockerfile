# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

COPY --chown=node . ./app

USER 1000   

WORKDIR /app

RUN npm install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

USER 1000   

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

USER 1000   

RUN npm run build

ENV NODE_ENV production

CMD ["npm", "run", "start"]
