import React, { useEffect, useState } from "react";
import { Player, PlayerListener } from "textalive-app-api";

const Try = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState("");
  const [lastText, setLastText] = useState("");
  const [textVolume, setTextVolume] = useState(0); // 読み上げの音量の初期値を0に設定
  const [musicVolume, setMusicVolume] = useState(60); // 音楽の音量の初期値を100に設定

  useEffect(() => {
    const player = new Player({
      app: {
        token: "YI8I8mIpotidyyxf",
      },
    });

    const playerListener: PlayerListener = {
      onVideoReady: (_) => {
        let word = player.video.firstWord;
        while (word && word.next) {
          word.animate = (now, unit) => {
            if (
              unit.startTime <= now &&
              unit.endTime > now &&
              text !== unit.text
            ) {
              setText(unit.text);
            }
          };
          word = word.next;
        }
        let phrase = player.video.firstPhrase;
        while (phrase && phrase.next) {
          phrase.animate = (now, unit) => {
            if (
              unit.startTime <= now &&
              unit.endTime > now &&
              text !== unit.text
            ) {
              setPhrase(unit.text);
            }
          };
          phrase = phrase.next;
        }
      },
    };

    player.createFromSongUrl("https://piapro.jp/t/hZ35/20240130103028");
    player.addListener(playerListener);
    player.volume = musicVolume;

    setPlayer(player);
  }, [musicVolume, text]);

  useEffect(() => {
    // プレイヤーの音量を更新
    if (player) {
      player.volume = musicVolume;
    }
  }, [musicVolume, player]);

  useEffect(() => {
    if (text && text !== lastText) {
      speakText(text);
      setLastText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastText, text]);

  const speakText = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.volume = textVolume; // ステートから音量を設定
    speechSynthesis.speak(utterance);
  };

  // 音量設定ボタンのハンドラー
  const handleVolumeChange = (
    textVol: React.SetStateAction<number>,
    musicVol: React.SetStateAction<number>
  ) => {
    setTextVolume(textVol);
    setMusicVolume(musicVol);
  };

  return (
    <div>
      <span id="text">{phrase}</span>
      <div>
        <button onClick={() => handleVolumeChange(1, 0)}>0%</button>
        <button onClick={() => handleVolumeChange(0.8, 20)}>50%</button>
        <button onClick={() => handleVolumeChange(0, 60)}>100%</button>
        <button onClick={() => player?.requestPlay()}>再生</button>
      </div>
    </div>
  );
};

export default Try;
