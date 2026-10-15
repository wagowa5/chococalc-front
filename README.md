# chococalc-front
[chococalc](https://github.com/wagowa5/chocoCalculator)のWeb版のフロント

# 公開
https://d3qw42y98ueoma.cloudfront.net/

# 構成図

![インフラ構成図 drawio](https://github.com/wagowa5/chococalc-front/assets/82742482/bf7c82a3-168f-4150-bac7-031e1925eaf9)



## 開発・検証

CI と同じ Node.js 18.12.1 と Yarn 1.x を使用します。

```sh
yarn install --frozen-lockfile
yarn start
yarn tsc --noEmit
CI=true yarn test --watchAll=false --runInBand
yarn build
python -m unittest discover -s aws/tests -v
```

AWS 接続には `REACT_APP_USER_POOL_ID`、`REACT_APP_CLIENT_ID`、
`REACT_APP_REGION`、`REACT_APP_IDENTITY_POOL_ID`、
`REACT_APP_CHOCOCALC_API_ENDPOINT` を開発用環境に合わせて設定してください。

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
