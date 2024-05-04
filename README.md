# Beginwrite

## アーキテクチャ

### Frontend
- Next.js

### API
- NestJS

### DB
- Prisma
- MySQL
- Redis

### Query
- GraphQL

## 起動方法
開発環境については、Docker で管理しています。

### Docker のインストール

```bash
$ brew install docker
```

### Docker 起動

```bash
$ docker-compose up --build -d
```

### マイグレーション実行
apps/server の環境変数定義した後、
apps コンテナに入り、マイグレーションを実行します。

```bash
$ docker exec -it beginwrite-apps-1 bash
$ pnpm prisma migrate dev
```

その後、http://localhost:3000 にアクセスして、サーバーが正常に動いているか、確認お願いします。
