FROM oven/bun:latest

COPY package.json ./
COPY package-lock.json ./
COPY src ./src

RUN bun install

CMD [ "bun", "run", "run" ]