import React, { useEffect } from "react";
import { PlayerSeekbar } from "textalive-react-api";

export const PlayerControl: React.FC<any> = ({ disabled, player }) => {
  const sliderStyles = {
    track: {
      backgroundColor: "#ddd",
      height: "16px",
      borderRadius: "0",
    },
    active: {
      backgroundColor: "#4CAF50",
      height: "16px",
      borderRadius: "0",
    },
    thumb: {
      backgroundColor: "transparent",
      width: "16px",
      height: "16px",
      borderRadius: "0",
      boxShadow: "none",
    },
    disabled: {
      backgroundColor: "#ccc",
      borderRadius: "0",
    },
  };

  useEffect(() => {
    // Player instance might be needed to manage within component lifecycle
    return () => {
      // Clean up player instance if necessary when component unmounts
    };
  }, [player]);

  return (
    <div>
      <div className="music-information__seekbar">
        <PlayerSeekbar
          player={!disabled ? player : undefined}
          styles={sliderStyles}
        />
      </div>
      <div className="music-information__layout">
        <p className="music-information__song-name">{player.data.song.name}</p>
        <p className="music-information__artist-name">
          {player.data.song.artist.name}
        </p>
      </div>
    </div>
  );
};

export default PlayerControl;
