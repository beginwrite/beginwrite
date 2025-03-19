# Beginwrite

## アーキテクチャ
開発環境については、Docker で管理しています。

### Frontend
- Next.js

### API
- NestJS

### DB
- Drizzle ORM
- MySQL
- Redis

### Query
- GraphQL

## 開発環境の構築

### パッケージインストール
パッケージをインストールします。

```bash
$ pnpm install
```

### Docker のインストール

```bash
$ brew install docker
```

### Docker セットアップ
以下コマンドでセットアップします。

```bash
$ cd apps/api
$ docker network create common_link
$ docker compose up --build -d
```

### 環境変数の設定
`apps/api` の環境変数を設定します。

```bash
$ cd apps/api
$ cp .env.sample .env
```

### マイグレーション実行
apps/api の環境変数定義した後、以下コマンドを実行します。

```bash
$ pnpm migration:generate
$ pnpm migration:run
```

### アプリ起動
ルートディレクトリで以下コマンドを実行すると、アプリが起動します。

```bash
$ cd ../..   # apps/api 内にいる場合に実行
$ pnpm start:dev
```

その後、http://localhost:3000 にアクセスして、サーバーが正常に動いているか、確認します。

### ファイル管理用のストレージサーバのセットアップ
開発環境では MinIO で画像ファイル保存用のストレージサーバを構築しています。
以下で、使用できるようにセットアップします。

### ファイルサーバにアクセス
http://localhost:9001 から入ります。

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

#### Buckets の設定変更
画像を匿名でも閲覧できるように、設定を変更します。

1. MinIO のコンソールにアクセスします
2. 左のサイドメニューから `Buckets` を選択します
3. develop を選択すると、左下に `Anonymous` という項目が出るのでクリックします
4. 右上の `Add Access Role` をクリックして、以下ルールを追加します

```
Prefix: *
Access: readonly
```

### 開発用 JWT シークレットキーの発行
開発用 JWT シークレットキーを Crypto API を使って作成します。 
以下コマンドを実行します。

```js
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

出力されたデータを `apps/api/.env` にある `JWT_SECRET` に設定します。
