import React from "react";
import AlivingButton from "./AlivingButton";
import Heart from "./Heart";

export const ControlAliving: React.FC<any> = ({
  setTextVolume,
  setMusicVolume,
  player,
  setMikuValue,
  setPrevMikuValue,
  status,
}) => {
  const handleVolumeChange = (
    textVolume: number,
    musicVolume: number,
    value: number
  ) => {
    setTextVolume(textVolume);
    setMusicVolume(musicVolume);
    if (player) {
      player.volume = musicVolume;
    }

    if (status === "play") setMikuValue(value);
    else {
      setPrevMikuValue(value);
      setMikuValue(0);
    }
  };

  const handleAliveChange = (aliveValue: number) => {
    // Alive の値に応じて handleVolumeChange を呼び出す
    if (aliveValue === 3) {
      handleVolumeChange(1, 0, 3);
    } else if (aliveValue === 2) {
      handleVolumeChange(0.8, 20, 2);
    } else if (aliveValue === 1) {
      handleVolumeChange(0, 60, 1);
    }
  };

  return (
    <div className="aliving-control fontsize__caption">
      <div className="aliving-control__interaction">
        <Heart />
        <AlivingButton onAliveChange={handleAliveChange} />
      </div>
    </div>
  );
};

export default ControlAliving;
