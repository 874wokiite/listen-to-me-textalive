import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Mousewheel } from "swiper/modules";
import { IPlayerApp, IVideo, Player, PlayerListener } from "textalive-app-api";
import { PlayerControl } from "./PlayerControl";
import { usePlayAndPause } from "@/component/hooks/PlayAndPause";
import { AlivingControl } from "./AlivingControl";
import { MikuAnimation } from "./MikuAnimation";

//楽曲
const tracks = [
  "https://piapro.jp/t/hZ35/20240130103028",
  "https://piapro.jp/t/--OD/20240202150903",
  "https://piapro.jp/t/XiaI/20240201203346",
  "https://piapro.jp/t/Rejk/20240202164429",
  "https://piapro.jp/t/ELIC/20240130010349",
  "https://piapro.jp/t/xEA7/20240202002556",
];

const Body2 = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [app, setApp] = useState<IPlayerApp | null>(null);
  const [video, setVideo] = useState<IVideo | null>(null);
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState("");
  const [lastText, setLastText] = useState("");
  const [textVolume, setTextVolume] = useState(0);
  const [musicVolume, setMusicVolume] = useState(60);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [mikuValue, setMikuValue] = useState(0);
  const [prevMikuValue, setPrevMikuValue] = useState<number | null>(null);
  const { togglePlayPause: playPause, status } = usePlayAndPause(player);

  const initializePlayer = () => {
    const newPlayer = new Player({
      app: {
        token: "YI8I8mIpotidyyxf",
      },
    });

    const playerListener: PlayerListener = {
      onAppReady: (app) => {
        console.log("--- [app] initialized as TextAlive app ---");
        console.log("managed:", app.managed);
        newPlayer.volume = musicVolume;
        if (!app.songUrl) {
          newPlayer.createFromSongUrl(tracks[currentTrackIndex]);
        }
        setApp(app);
      },
      onVideoReady: (video) => {
        setVideo(video);
        animateWords(newPlayer);
        animatePhrases(newPlayer);
      },
      onTimerReady: () => {
        setPlayer(newPlayer);
      },
    };

    newPlayer.addListener(playerListener);
    return newPlayer;
  };

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

  const handleSlideChange = (swiper: { realIndex: number }) => {
    setCurrentTrackIndex(swiper.realIndex);
    if (player) {
      player
        .createFromSongUrl(tracks[swiper.realIndex])
        .then(() => player.requestPlay())
        .catch((error) => console.error("Error loading track:", error));
    }
  };

  const handleTogglePlayPause = () => {
    if (status === "play") {
      setPrevMikuValue(mikuValue);
      setMikuValue(0);
    } else if (status === "pause" && prevMikuValue !== null) {
      setMikuValue(prevMikuValue);
      setPrevMikuValue(null);
    }
    playPause();
  };

  if (!player) {
    setPlayer(initializePlayer());
  }

  useEffect(() => {
    if (text && text !== lastText) {
      speakText(text);
      setLastText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastText, text]);

  return (
    <>
      {player && video && app ? (
        <div className="control-area">
          <div className="miku-image">
            <MikuAnimation setMikuValue={mikuValue} />
          </div>
          <div className="aliving-control__layout">
            <AlivingControl
              setTextVolume={setTextVolume}
              setMusicVolume={setMusicVolume}
              player={player}
              setMikuValue={setMikuValue}
            />
          </div>

          <div className="music-information">
            <PlayerControl disabled={app.managed} player={player} />
          </div>
          <div className="scroll-area">
            <Swiper
              direction="vertical"
              modules={[A11y, Mousewheel]}
              slidesPerView={1}
              spaceBetween={0}
              mousewheel={{
                invert: false,
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1,
              }}
              className="mySwiper"
              autoHeight={false}
              onSlideChange={handleSlideChange}
              loop={true}
              onClick={handleTogglePlayPause}
            >
              {tracks.map((track) => (
                <SwiperSlide key={track}>
                  <div className="lyrics__layout">
                    <p className="fontsize__lyrics lyrics">{phrase}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading...</p> {/* ここに任意のローディングインジケータを表示 */}
          {/* 例えば CSS でスタイルされたスピナーなど */}
        </div>
      )}
    </>
  );
};

export default Body2;
