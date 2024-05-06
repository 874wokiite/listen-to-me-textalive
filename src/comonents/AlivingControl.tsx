export const AlivingControl: React.FC<any> = ({
  setTextVolume,
  setMusicVolume,
  player,
}) => {
  // 音量設定ボタンのハンドラー
  const handleVolumeChange = (
    textVolume: React.SetStateAction<any>,
    musicVolume: React.SetStateAction<any>
  ) => {
    setTextVolume(textVolume);
    setMusicVolume(musicVolume);
    if (player) {
      player.volume = musicVolume;
      console.log("更新されたで", player.volume);
    }
  };

  return (
    <div className="control">
      <button onClick={() => handleVolumeChange(1, 0)}>0%</button>
      <button onClick={() => handleVolumeChange(0.8, 20)}>50%</button>
      <button onClick={() => handleVolumeChange(0, 60)}>100%</button>
    </div>
  );
};

export default AlivingControl;
