# Beginwrite

## アーキテクチャ

### Frontend
- Next.js

### API
- NestJS

### DB
- Prisma
- MySQL

### Query
- GraphQL


## インストール

以下コマンドでインストールします。

```bash
$ pnpm install
```

## MySQL のインストール

Mac の場合、homebrew を使用して、MySQL をインストールします。

```bash
$ brew install mysql-client
```

### MySQL の起動

以下コマンドを実行します。

```bash
$ mysql.server start
```

## DB Migration

DBマイグレーションは Prisma で管理しています。
以下コマンドでマイグレーションを実行します。

```bash
$ cd apps/backend
$ pnpm prisma migrate dev
```

## サーバ起動
以下コマンドを実行して、サーバを起動します。

```bash
$ cd ../..
$ pnpm start:dev
```
