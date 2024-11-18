FROM oven/bun:alpine

COPY package.json ./
COPY package-lock.json ./
COPY src ./src

RUN bun install

CMD [ "bun", "run", "run" ]