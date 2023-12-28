FROM oven/bun:1

COPY . /app

WORKDIR /app/project/app

RUN bun install

CMD bash -c "bun run server.js & bun run start"