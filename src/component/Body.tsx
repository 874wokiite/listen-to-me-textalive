import React, { useState, useEffect } from "react";
import { Player, PlayerListener } from "textalive-app-api";
import { ControlPlayer } from "./ControlPlayer";
import { usePlayPause } from "./hooks/PlayPause";
import { ControlAliving } from "./ControlAliving";
import { MikuAnimation } from "./MikuAnimation";
import ControlSlide from "./ControlSlide";
import Loading from "./Loading";
import { tracks } from "./configs/Tracks";

interface BodyProps {
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Body: React.FC<BodyProps> = ({ setCurrentTrackIndex }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [wordText, setWordText] = useState("");
  const [phraseText, setPhraseText] = useState("");
  const [textVolume, setTextVolume] = useState(1); // あとで0に戻す
  const [musicVolume, setMusicVolume] = useState(0); // あとで60に戻す
  const [currentTrackIndex, setTrackIndex] = useState(0);
  const [mikuValue, setMikuValue] = useState(1);
  const [prevMikuValue, setPrevMikuValue] = useState(0);
  const [playPauseValue, setPlayPauseValue] = useState(0);
  const { togglePlayPause: playPause, status } = usePlayPause(player);

  // const playerToken = process.env.NEXT_PUBLIC_PLAYER_TOKEN;

  // if (!playerToken) {
  //   throw new Error("NEXT_PUBLIC_PLAYER_TOKEN is not defined");
  // }
  // TODO: パブリック化するときに環境変数にする

  // 画像をプリロードする関数
  const preloadImages = () => {
    tracks.forEach((track) => {
      const img = new Image();
      img.src = track.background;
      const imgPC = new Image();
      imgPC.src = track.backgroundPC;
    });
  };

  useEffect(() => {
    preloadImages(); // コンポーネントがマウントされた時に画像をプリロード
  }, []);

  useEffect(() => {
    const player = new Player({
      app: {
        token: "YI8I8mIpotidyyxf",
      },
    });

    void player.createFromSongUrl(tracks[0].url).catch((error) => {
      console.error("Error initializing track:", error);
    });

    const playerListener: PlayerListener = {
      onTimerReady: () => {
        animateWords(player);
        animatePhrases(player);
        setPlayer(player);
        // playerが準備完了したら、ユーザーの操作を待ってから再生する
        console.log("Player is ready");
      },
    };
    // void player.createFromSongUrl(tracks[0].url, tracks[0].options);
    player.addListener(playerListener);
    return () => {
      console.log("--- [player] shutdown ---");
      player.removeListener(playerListener);
    };
  }, []);

  const animatePhrases = (player: Player) => {
    let phrase = player.video?.firstPhrase;
    while (phrase && phrase.next) {
      phrase.animate = (now, unit) => {
        if (
          unit.startTime <= now &&
          unit.endTime > now &&
          phraseText !== unit.text
        ) {
          setPhraseText(unit.text);
        }
      };
      phrase = phrase.next;
    }
  };

  const animateWords = (player: Player) => {
    let word = player.video?.firstWord;
    while (word && word.next) {
      word.animate = (now, unit) => {
        if (
          unit.startTime <= now &&
          unit.endTime > now &&
          wordText !== unit.text
        ) {
          setWordText(unit.text);
        }
      };
      word = word.next;
    }
  };

  const speakText = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.volume = textVolume;
    utterance.rate = 1.5;
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };
    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error in speech synthesis:", error);
    }
  };

  // 前後の曲に切り替わった時に更新をする
  useEffect(() => {
    const loadTrack = async () => {
      if (player && currentTrackIndex !== undefined) {
        try {
          await player
            .createFromSongUrl(
              tracks[currentTrackIndex].url,
              tracks[currentTrackIndex].options
            )
            .catch((error) => {
              console.error("Error loading track:", error);
              alert("トラックの読み込みに失敗しました。再試行してください。");
            });
          player.requestStop();
          setPhraseText(" ");
          setWordText(" ");
          if (mikuValue !== 0) setPrevMikuValue(mikuValue);
          setMikuValue(0);
          setPlayPauseValue(0);
          console.log("preMikuValue", prevMikuValue);
        } catch (error) {
          console.error("Error loading track:", error);
        }
      }
    };

    loadTrack();
  }, [currentTrackIndex, player]);

  const handleSlideChange = (swiper: {
    realIndex: React.SetStateAction<number>;
  }) => {
    setTrackIndex(swiper.realIndex);
    setCurrentTrackIndex(swiper.realIndex); // 親コンポーネントの状態も更新
  };

  const handleTogglePlayPause = () => {
    if (status === "play") {
      setPrevMikuValue(mikuValue);
      setMikuValue(0);
      setPlayPauseValue(2);
      console.log("PlayPauseValue", playPauseValue);
      console.log("MikuValue", mikuValue);
      console.log("preMikuValue", prevMikuValue);
      if (player) {
        player.requestPause();
      }
      speechSynthesis.cancel(); // 追加: 再生停止時に音声合成も停止する
    } else if (status === "pause" || status === "stop") {
      setMikuValue(prevMikuValue);
      setPlayPauseValue(1);
      console.log("PlayPauseValue", playPauseValue);
      console.log("MikuValue", mikuValue);
      console.log("preMikuValue", prevMikuValue);
      if (player) {
        player.requestPlay();
      }
      if (wordText) {
        speakText(wordText); // 追加: 再生開始時に音声合成も再生する
      }
    }
    playPause();
  };

  useEffect(() => {
    if (wordText) speakText(wordText);
  }, [wordText]);

  return (
    <>
      {player ? (
        <div
          className="control-area"
          style={{
            backgroundImage: `url(${tracks[currentTrackIndex].background})`,
          }}
        >
          <MikuAnimation mikuValue={mikuValue} />
          <ControlAliving
            setTextVolume={setTextVolume}
            setMusicVolume={setMusicVolume}
            player={player}
            setMikuValue={setMikuValue}
            setPrevMikuValue={setPrevMikuValue}
            status={status}
          />
          <ControlPlayer player={player} />
          <ControlSlide
            handleSlideChange={handleSlideChange}
            handleTogglePlayPause={handleTogglePlayPause}
            tracks={tracks}
            phraseText={phraseText}
            playPauseValue={playPauseValue}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Body;
