import React, { useEffect, useState } from "react";
import { Player, PlayerListener } from "textalive-app-api";

const Body = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const player = new Player({
      app: {
        token: "YI8I8mIpotidyyxf",
      },
    });
    const playerListener: PlayerListener = {
      onVideoReady: (_) => {
        let phrase = player.video.firstPhrase;
        while (phrase && phrase.next) {
          phrase.animate = (now, unit) => {
            if (unit.startTime <= now && unit.endTime > now) {
              setText(unit.text);
              //ここに入ったtextを読み上げたい
            }
          };
          phrase = phrase.next;
        }
      },
    };

    player.createFromSongUrl("https://piapro.jp/t/hZ35/20240130103028");
    player.addListener(playerListener);

    setPlayer(player);
  }, []);

  return (
    <div>
      <span id="text">{text}</span>
      {player && (
        <div>
          <button onClick={() => player.requestPlay()}>としアホ</button>
        </div>
      )}
    </div>
  );
};

export default Body;
