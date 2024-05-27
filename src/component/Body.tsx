import React, { useState, useEffect } from "react";
import { IPlayerApp, IVideo, Player, PlayerListener } from "textalive-app-api";
import { PlayerControl } from "./ControlPlayer";
import { usePlayAndPause } from "@/component/hooks/PlayAndPause";
import { AlivingControl } from "./ControlAliving";
import { MikuAnimation } from "./MikuAnimation";
import ControlSlide from "./ControlSlide";
import Loading from "./Loading";

//楽曲
const tracks = [
  "https://piapro.jp/t/hZ35/20240130103028",
  "https://piapro.jp/t/--OD/20240202150903",
  "https://piapro.jp/t/XiaI/20240201203346",
  "https://piapro.jp/t/Rejk/20240202164429",
  "https://piapro.jp/t/ELIC/20240130010349",
  "https://piapro.jp/t/xEA7/20240202002556",
];

const Body = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [app, setApp] = useState<IPlayerApp | null>(null);
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState("");
  const [lastText, setLastText] = useState("");
  const [textVolume, setTextVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(60);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [mikuValue, setMikuValue] = useState(1);
  const [prevMikuValue, setPrevMikuValue] = useState(0);
  const { togglePlayPause: playPause, status } = usePlayAndPause(player);

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
        player.volume = musicVolume;
        if (!app.songUrl) {
          player.createFromSongUrl(tracks[currentTrackIndex]);
        }
        setApp(app);
      },

      onTimerReady: () => {
        animateWords(player);
        animatePhrases(player);
        setPlayer(player);
      },
    };
    player.addListener(playerListener);
    return () => {
      console.log("--- [app] shutdown ---");
      player.removeListener(playerListener);
    };
  }, []);

  const animateWords = (player: Player) => {
    let word = player.video?.firstWord;
    while (word && word.next) {
      word.animate = (now, unit) => {
        if (unit.startTime <= now && unit.endTime > now && text !== unit.text) {
          setText(unit.text);
        }
      };
      word = word.next;
    }
  };

  const animatePhrases = (player: Player) => {
    let phrase = player.video?.firstPhrase;
    while (phrase && phrase.next) {
      phrase.animate = (now, unit) => {
        if (unit.startTime <= now && unit.endTime > now && text !== unit.text) {
          setPhrase(unit.text);
        }
      };
      phrase = phrase.next;
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.volume = textVolume;
    utterance.rate = 1.5;
    speechSynthesis.speak(utterance);
  };

  // 前後の曲に切り替わった時に更新をする
  useEffect(() => {
    const loadTrack = async () => {
      if (player && currentTrackIndex !== undefined) {
        try {
          await player.createFromSongUrl(tracks[currentTrackIndex]);
          player.requestStop();
          setPrevMikuValue(mikuValue);
          setMikuValue(0);

          setText("");
          setPhrase("");
        } catch (error) {
          console.error("Error loading track:", error);
          alert("トラックの読み込みに失敗しました。再試行してください。");
        }
      }
    };

    loadTrack();
  }, [currentTrackIndex, player]);

  const handleSlideChange = (swiper: {
    realIndex: React.SetStateAction<number>;
  }) => {
    setCurrentTrackIndex(swiper.realIndex); // realIndexを使うように変更
  };

  const handleTogglePlayPause = () => {
    if (status === "play") {
      setPrevMikuValue(mikuValue);
      setMikuValue(0);
    } else if (status === "pause" || status === "stop") {
      setMikuValue(prevMikuValue);
    }
    playPause();
  };

  useEffect(() => {
    if (text && text !== lastText) {
      if (textVolume >= 0.8) {
        speakText(text);
      }
      setLastText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastText, text]);

  return (
    <>
      {player && app ? (
        <div className="control-area">
          <MikuAnimation setMikuValue={mikuValue} />
          <AlivingControl
            setTextVolume={setTextVolume}
            setMusicVolume={setMusicVolume}
            player={player}
            setMikuValue={setMikuValue}
            setPrevMikuValue={setPrevMikuValue}
            status={status}
          />
          <PlayerControl disabled={app.managed} player={player} />
          <ControlSlide
            handleSlideChange={handleSlideChange}
            handleTogglePlayPause={handleTogglePlayPause}
            tracks={tracks}
            phrase={phrase}
          />
        </div>
      ) : (
        <div className="loading">
          <Loading />
          なんじゃこれーーーーーー
        </div>
      )}
    </>
  );
};

export default Body;
