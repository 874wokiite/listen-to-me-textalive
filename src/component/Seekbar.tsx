import React, { useEffect, useState } from "react";
import { Player } from "textalive-app-api";

interface SeekBarProps {
  player: Player | null;
}

const SeekBar: React.FC<SeekBarProps> = ({ player }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!player) return;

    const handleTimeUpdate = () => {
      setProgress((player.timer.position / player.video.duration) * 100);
    };

    player.addListener({ onTimeUpdate: handleTimeUpdate });

    return () => {
      player.removeListener({ onTimeUpdate: handleTimeUpdate });
    };
  }, [player]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      const newTime =
        (Number(event.target.value) / 100) * player.video.duration;
      player.requestMediaSeek(newTime);
    }
  };

  return (
    <div className="seek-bar">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="seek-bar__input"
        style={{ "--value": progress } as React.CSSProperties}
      />
    </div>
  );
};

export default SeekBar;
