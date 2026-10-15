# chococalc-front
[chococalc](https://github.com/wagowa5/chocoCalculator)のWeb版のフロント

# 公開
https://d3qw42y98ueoma.cloudfront.net/

# 構成図

![インフラ構成図 drawio](https://github.com/wagowa5/chococalc-front/assets/82742482/bf7c82a3-168f-4150-bac7-031e1925eaf9)



## 開発・検証

CI と同じ Node.js 24.22.0 と Yarn 1.22.22 を使用します。
Node.js のバージョンは `.node-version` に固定しています。依存関係は Yarn と
`yarn.lock` で管理します。古い `package-lock.json` は削除しました。

```sh
yarn install --frozen-lockfile
yarn start
yarn typecheck
yarn test
yarn build
python -m unittest discover -s aws/tests -v
```

AWS 接続には `REACT_APP_USER_POOL_ID`、`REACT_APP_CLIENT_ID`、
`REACT_APP_REGION`、`REACT_APP_IDENTITY_POOL_ID`、
`REACT_APP_CHOCOCALC_API_ENDPOINT` を開発用環境に合わせて設定してください。
シェルの環境変数または `.env.local` が使用できます。Vite の `envPrefix` で
既存の `REACT_APP_` 名を維持しています。これらの値はブラウザーへ配信されるため、
AWS アクセスキーなどの秘密情報は設定しないでください。

ビルドは Vite、テストは Vitest を使用します。`yarn test:watch` でテストを継続実行できます。
`yarn build` は型チェックを行い、従来どおり `build/` に出力します。
`yarn preview` で本番ビルドをローカル確認できます。開発・preview サーバーは
ポート 3000 を使用します。

## アカウント削除

ログイン後、PC・モバイルのヘッダーにある「アカウント削除」から実行できます。
確認に同意すると、保存済みマネキンを既存 API で削除した後、Cognito の
`DeleteUser` で現在のアカウントを削除し、ログアウトします。
一覧取得やマネキン削除が失敗した場合は、アカウント削除に進みません。
処理は複数の通信に分かれるため、途中で失敗するとマネキンだけが一部または全部削除される
場合があります。エラーを確認して再実行してください。削除中は別の画面から保存しないでください。

リリース時はフロントに加えて `aws/lambda/MannequinsFunction.py` も既存の一覧取得
Lambda に反映してください。DynamoDB の全ページを取得する修正が含まれており、
古い Lambda のままだと 1 MB を超える保存データを削除しきれない場合があります。
実際の AWS 環境では、テスト用アカウントでログイン・複数マネキン保存・削除・再ログイン不可を
確認してください。

## 依存関係の監査

`yarn audit` で再確認できます。セキュリティ更新の内容と検証結果は
[依存関係のセキュリティ更新](docs/dependency-security.md) を参照してください。
