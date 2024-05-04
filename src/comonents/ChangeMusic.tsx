import React from "react";

const ChangeMusic: React.FC<any> = ({
  currentTrackIndex,
  setCurrentTrackIndex,
  totalTracks,
}) => {
  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex: number) =>
      prevIndex === 0 ? totalTracks - 1 : prevIndex - 1
    );
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex: number) => (prevIndex + 1) % totalTracks);
  };

  return (
    <div>
      <button onClick={handlePreviousTrack}>前の曲へ戻る</button>
      <button onClick={handleNextTrack}>次の曲へ</button>
    </div>
  );
};

export default ChangeMusic;
