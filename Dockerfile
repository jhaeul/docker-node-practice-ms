FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY index.js ./

EXPOSE 8080

USER node

CMD ["node", "index.js"]