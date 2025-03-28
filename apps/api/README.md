# backend(API)

## プロジェクトの構成

### `db`
DB マイグレーション関連のファイルが格納されています。

### `src`
API に関するファイルが格納されています。
基本的にドメインごとに分ける形で管理しています。

#### `applications`
Guard や 外部ツールの連携などを格納します。

#### `domains`
各ドメイン情報のファイルを格納しています。
ドメインは以下のフォルダがあります。

- `entities`
- `repositories`

#### `domains/entities`
各 Entity 情報を管理しています。

#### `domains/repositories`
DB操作の処理を管理しています。

#### `graphql`
graphql の情報が記載されたファイルが格納されています。
基本的に、自動的に編集されるので、特にこの辺を触る必要はないです。

#### `mocks`
テストに必要なモックを格納します。
モックデータは、こちらに記載してください。

#### `resolvers`
query, mutation の処理を管理しています。

#### `modules`
各ドメインのモジュールを管理しています。
(`app.module.ts` は src 直下に設置してます)

#### `use-cases`
repository を使用した処理をユースケースごとに格納しています。
基本的には `resolvers` のメソッドに準じたユースケースで作成されます。

## フォルダ作成する際に注意すべきところ
- 機能追加する際は、ドメインごとに分けるように意識してください

## ユニットテストについて
APIユニットテストは、以下のフォルダ配下のファイルのみ書いていきます。

- `use-cases`
- `resolvers`
