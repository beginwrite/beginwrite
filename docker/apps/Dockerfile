FROM node:22.9.0@sha256:69e667a79aa41ec0db50bc452a60e705ca16f35285eaf037ebe627a65a5cdf52

WORKDIR /

COPY ./ ./

RUN npm install -g pnpm@9.12.1

RUN pnpm install

EXPOSE 3000
EXPOSE 8000
