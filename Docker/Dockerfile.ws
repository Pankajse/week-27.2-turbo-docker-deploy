FROM oven/bun:1

WORKDIR /app

COPY ./package.json ./package.json
COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json
COPY ./apps/ws  ./apps/ws

RUN bun install

RUN bun run generate:db

EXPOSE 8081

CMD [ "bun", "run", "start:ws" ]