# 依存関係のセキュリティ更新（2026-10-15）

`yarn audit --json` で JavaScript の依存関係を監査し、既知の脆弱性を解消しました。
監査は開発・ビルド・テスト用の依存関係も対象にしています。

| 重大度 | 更新前 | 更新後 |
| --- | ---: | ---: |
| Critical | 10 | 0 |
| High | 287 | 0 |
| Moderate | 202 | 0 |
| Low | 48 | 0 |

件数は Yarn の auditSummary の値です。同じ脆弱性が複数の依存経路に現れるため、
一意のアドバイザリー数とは異なります。更新前の一意のアドバイザリーは 148 件です。
これは上記の日付時点で監査データベースに登録された問題の検出結果です。
Python・AWS のマネージドランタイム・アプリケーション独自の認可処理の監査は含みません。

## 変更

- 未使用の `aws-amplify`、`@aws-amplify/ui-react`、`math.js` を削除。
- Cognito SDK を 6.3.22、React を 18.3.1、MUI を 5.18.0 へ更新。
- 古い計算ライブラリ `maths.ts` を `mathjs` 15.2.0 の数値用エントリーポイントに置き換え。
  入力検証と計算処理で同じ関数を使い、有限の実数だけを受け入れる。
- `react-scripts` の古い間接依存を排除するため、Vite 8.3.4 と Vitest 5.0.4 に移行。
  TypeScript は 5.9.3、Node.js は 24.22.0、Yarn は 1.22.22。
- テスト関連は devDependencies へ分離。古い npm ロックファイルを削除し、
  CI で使用している Yarn と `yarn.lock` に統一。
- `REACT_APP_` の公開環境変数名、`yarn start`、`yarn build`、`build/` の出力先を維持。
  `yarn test` は Vitest の単発実行、継続実行は `yarn test:watch`。
- CI を Node.js の固定バージョン、frozen-lockfile、型チェックとテスト実行に対応。

## 検証

- `yarn install --frozen-lockfile --non-interactive`: 成功。
- `yarn typecheck`、`yarn build`: 成功。
- `yarn test`: 5 ファイル、28 件成功。
- `yarn audit --json`: 全重大度 0 件。
- 開発サーバーと本番ビルドをブラウザーで確認。PC 1280px・モバイル 390px で
  `157+342 → 499`、終了案内、Cognito の SRP 要求・チャレンジ応答・ログアウト、
  削除への同意とキャンセル・データ削除失敗・再試行・アカウント削除後のログアウトを確認。
  AWS/API の応答はすべてローカルでモックし、実際のアカウントや保存データは変更していない。
- 四則演算、括弧、べき乗、不正入力、無限大・非実数の拒否をテスト。

実 AWS 環境での認証と削除、GitHub Actions 上でのデプロイ実行は未検証です。
新しい数式処理を含む本番のメイン JS は gzip 約 259 KB です（更新前は約 196 KB）。
Vite はチャンクサイズの警告を出しますが、ビルドは成功しています。
