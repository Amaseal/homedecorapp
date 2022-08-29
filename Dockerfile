# stage build
FROM node:16.17.0-alpine3.15 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build && npm prune --production

# stage run
FROM node:16.17.0-alpine3.15
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
ENV PORT 4000
EXPOSE ${PORT}
CMD ["node", "build"]
