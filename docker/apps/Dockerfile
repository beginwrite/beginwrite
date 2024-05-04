FROM node:20.9.0

WORKDIR /

COPY ./ ./

RUN npm install -g pnpm@9.0.6

RUN pnpm install

EXPOSE 3000
EXPOSE 8000
