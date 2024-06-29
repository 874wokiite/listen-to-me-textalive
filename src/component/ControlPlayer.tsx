import React, { useEffect } from "react";
import SeekBar from "./Seekbar";

export const ControlPlayer: React.FC<any> = ({ player }) => {
  useEffect(() => {
    // Player instance might be needed to manage within component lifecycle
    return () => {
      // Clean up player instance if necessary when component unmounts
    };
  }, [player]);

  return (
    <>
      {player.data.song.name && player.data.song.artist.name ? (
        <div className="music-information">
          <SeekBar player={player} />
          <div className="music-information__layout">
            <p className="music-information__song-name fontsize__body">
              {player.data.song.name}
            </p>
            <p className="music-information__artist-name fontsize__caption">
              <span>by </span>
              {player.data.song.artist.name}
            </p>
          </div>
        </div>
      ) : (
        <div>aaa</div>
      )}
    </>
  );
};

export default ControlPlayer;
