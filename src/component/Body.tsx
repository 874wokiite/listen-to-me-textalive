import React, { useState, useEffect } from "react";
import { Player, PlayerListener } from "textalive-app-api";
import { ControlPlayer } from "./ControlPlayer";
import { usePlayPause } from "./hooks/PlayPause";
import { ControlAliving } from "./ControlAliving";
import { MikuAnimation } from "./MikuAnimation";
import ControlSlide from "./ControlSlide";
import Loading from "./Loading";
import { tracks } from "./configs/Tracks";

const Body = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState("");
  const [lastText, setLastText] = useState("");
  const [textVolume, setTextVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(60);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [mikuValue, setMikuValue] = useState(1);
  const [prevMikuValue, setPrevMikuValue] = useState(0);
  const [playPauseValue, setPlayPauseValue] = useState(0);
  const { togglePlayPause: playPause, status } = usePlayPause(player);
  const playerToken = process.env.NEXT_PUBLIC_PLAYER_TOKEN;

  if (!playerToken) {
    throw new Error("NEXT_PUBLIC_PLAYER_TOKEN is not defined");
  }

  useEffect(() => {
    const player = new Player({
      app: {
        token: playerToken,
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
          setPhrase(" ");
          setText(" ");
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
    setCurrentTrackIndex(swiper.realIndex);
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
    } else if (status === "pause" || status === "stop") {
      setMikuValue(prevMikuValue);
      setPlayPauseValue(1);
      console.log("PlayPauseValue", playPauseValue);
      console.log("MikuValue", mikuValue);
      console.log("preMikuValue", prevMikuValue);
      if (player) {
        player.requestPlay();
      }
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
  }, [lastText, text]);

  console.log(player ? "ある!" : "ない...");
  console.log(player?.data.song.name ? "ある!" : "ない...");

  return (
    <>
      {player ? (
        <div className="control-area">
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
            phrase={phrase}
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
