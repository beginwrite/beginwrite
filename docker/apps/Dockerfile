FROM node:22.9.0

WORKDIR /

COPY ./ ./

RUN npm install -g pnpm@9.12.1

RUN pnpm install

EXPOSE 3000
EXPOSE 8000
