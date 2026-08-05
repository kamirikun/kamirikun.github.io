# Brawl Fun Lab — ブロスタ依存度診断

GitHub Pagesで公開できる、HTML・CSS・JavaScriptだけの静的サイトです。

## ファイル

- `index.html`：診断本体
- `style.css`：デザイン
- `script.js`：診断ロジック
- `privacy.html`：プライバシーポリシー
- `about.html`：運営者情報
- `.nojekyll`：GitHub Pages向け設定

## GitHub Pagesで公開する手順

1. GitHubで新しいPublicリポジトリを作成
2. このフォルダ内のファイルをすべてアップロード
3. リポジトリの `Settings` → `Pages`
4. `Build and deployment` のSourceを `Deploy from a branch`
5. Branchを `main`、フォルダを `/(root)` にして保存
6. 表示されたURLを開く

## 公開前に変更する場所

- `about.html` の連絡先
- サイト名を変更する場合は各HTMLのタイトルと表示名
- AdSense承認前は広告コードを置かない
- AdSense承認後は `index.html` の `.ad-placeholder` 周辺へ公式コードを設置

## 注意

このサイトは医学的診断ではなく、エンタメ目的のジョーク診断です。
Supercellのファンコンテンツポリシーを確認してから運営してください。
