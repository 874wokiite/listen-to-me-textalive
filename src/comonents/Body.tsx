import React, { useEffect, useState } from "react";
import { IPlayerApp, IVideo, Player, PlayerListener } from "textalive-app-api";
import { PlayerControl } from "@/comonents/PlayerControl";
import ChangeMusic from "./ChangeMusic";

const Body = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [app, setApp] = useState<IPlayerApp | null>(null); //added
  const [video, setVideo] = useState<IVideo | null>(null);
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState("");
  const [lastText, setLastText] = useState("");
  const [textVolume, setTextVolume] = useState(0); // 読み上げの音量の初期値を0に設定
  const [musicVolume, setMusicVolume] = useState(60); // 音楽の音量の初期値を60に設定
  const [currentTrackIndex, setCurrentTrackIndex] = useState(3);

  const tracks = [
    "https://piapro.jp/t/hZ35/20240130103028",
    "https://piapro.jp/t/--OD/20240202150903",
    "https://piapro.jp/t/XiaI/20240201203346",
    "https://piapro.jp/t/Rejk/20240202164429",
    "https://piapro.jp/t/ELIC/20240130010349",
    "https://piapro.jp/t/xEA7/20240202002556",
  ];

  useEffect(() => {
    const player = new Player({
      app: {
        token: "YI8I8mIpotidyyxf",
      },
    });

    const playerListener: PlayerListener = {
      onAppReady: (app) => {
        console.log("--- [app] initialized as TextAlive app ---");
        console.log("managed:", app.managed);
        if (!app.songUrl) {
          player.createFromSongUrl(tracks[currentTrackIndex]);
        }
        setApp(app);
      },

      onVideoReady: (video) => {
        console.log("本体の音量", player.volume);
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
        setVideo(video);
      },
      onTimerReady: () => {
        setPlayer(player);
      },
    };
    player.addListener(playerListener);
    return () => {
      console.log("--- [app] shutdown ---");
      player.removeListener(playerListener);
    };
  }, []);

  useEffect(() => {
    if (text && text !== lastText) {
      speakText(text);
      setLastText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastText, text]);

  // 前後の曲に切り替わった時に更新をする
  useEffect(() => {
    if (player && currentTrackIndex !== undefined) {
      player
        .createFromSongUrl(tracks[currentTrackIndex])
        .then(() => player.requestPlay())
        .catch((error) => console.error("Error loading track:", error));
    }
  }, [currentTrackIndex, player]);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.volume = textVolume; // ステートから音量を設定
    utterance.rate = 1.5; // 読み上げ速度を設定
    speechSynthesis.speak(utterance);
  };

  // 音量設定ボタンのハンドラー
  const handleVolumeChange = (
    textVol: React.SetStateAction<any>,
    musicVol: React.SetStateAction<any>
  ) => {
    setTextVolume(textVol);
    setMusicVolume(musicVol);
    if (player) {
      player.volume = musicVol;
      console.log("更新されたで", player.volume);
    }
  };

  return (
    <>
      {player && video && (
        <div>
          <span>{phrase}</span>
          <div>
            <p>{player.data.song.artist.name}</p>
            <p>{player.data.song.name}</p>
          </div>
          <div>
            <button onClick={() => handleVolumeChange(1, 0)}>0%</button>
            <button onClick={() => handleVolumeChange(0.8, 20)}>50%</button>
            <button onClick={() => handleVolumeChange(0, 60)}>100%</button>
            <div>
              <ChangeMusic
                setCurrentTrackIndex={setCurrentTrackIndex}
                totalTracks={tracks.length}
              />
            </div>
            {player && app && (
              <div className="controls">
                <PlayerControl disabled={app.managed} player={player} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
