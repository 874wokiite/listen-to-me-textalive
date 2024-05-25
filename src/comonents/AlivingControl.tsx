export const AlivingControl: React.FC<any> = ({
  setTextVolume,
  setMusicVolume,
  player,
  setMikuValue,
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
    setMikuValue(value); // 画像のインデックスを設定
  };

  return (
    <div className="aliving-control fontsize__caption">
      <button
        onClick={() => handleVolumeChange(1, 0, 3)}
        className="aliving-control__button"
      >
        0%
      </button>
      <button
        onClick={() => handleVolumeChange(0.8, 20, 2)}
        className="aliving-control__button"
      >
        50%
      </button>
      <button
        onClick={() => handleVolumeChange(0, 60, 1)}
        className="aliving-control__button"
      >
        100%
      </button>
    </div>
  );
};

export default AlivingControl;
