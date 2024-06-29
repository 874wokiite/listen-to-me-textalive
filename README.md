デモ環境：https://textnotalive.netlify.app/

検証方法：/out フォルダをサーバに設置すると見れるようになっているはずですが、うまくいかない場合はビルドをしてください。


## 作品について
textaliveって言うけど、目を瞑ったら別に生きてないよな？
そこから、曲と同じタイミングでテキスト読み上げをするとどうなるんだろうって思いこの作品を作ることにしました。

また、目を瞑っていても生きてるように感じるにはどうしたらいいか？と考え、上下スワイプで楽曲を切り替えるインタラクションを採用してみました。

もちろん、目を開けててもミクの可愛さ、堪能できます。
テキスト読み上げと楽曲の音量バランスが変わるたびにミクのアニメーションが変化します。

目も耳もtextaliveです！！！！！
![textalive image](https://github.com/874wokiite/listen-to-me-textalive/assets/98846813/fa6d4a07-6125-41dc-ac46-b6e3c389dc3f)

## できること
- 楽曲の再生/一時停止
- 上下スワイプで楽曲切り替え
- 楽曲とテキスト読み上げの音量バランス操作
- いいね（特にカウントはされない）


## アピールポイント
ミクの表情とアニメーションが可愛くできました。


## 使った技術
- [Next.js ](https://nextjs.org/)(TypeScript/React)
- [Swiper](https://swiperjs.com/)
  - 上下スワイプインタラクション
- [Rive](https://rive.app/)
  - アニメーション全般   


## 動作環境
PC版
- Chrome
- Firefox
- Safari

SP版
- Chrome(※iOS, Android)
- Safari(※iOS)
※iOSだとテキスト読み上げが動作していません


