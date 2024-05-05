# Beginwrite

## アーキテクチャ
開発環境については、Docker で管理しています。

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

## 開発環境の構築

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

その後、http://localhost:3000 にアクセスして、サーバーが正常に動いているか、確認します。

### ファイル管理用のストレージサーバのセットアップ
開発環境では Minio でファイル管理用のストレージサーバを構築しています。
以下で、使用できるようにセットアップします。

### バケットの作成
コンソールからバケットをセットアップします。

1. 左のメニューにある `Buckets` をクリック
2. 右上の `Create Bucket` をクリック
3. 画面に従って、`develop` という名前でバケットを作成する (name 以外の項目の設定は不要)

#### アクセスキーの設定
コンソールからアクセスキーをセットアップします。

1. 左の `Access Key` をクリック
2. 右上にある `Create Access Key` をクリック
3. name だけ入力します
4. フォームの create を押して、アクセスキーを作成します
5. アクセスキーとシークレットキーが発行されるので、コピーします
6. apps/server の環境変数 `AWS_ACCESS_KEY`, `AWS_SECRET_KEY` にそれぞれ設定します

