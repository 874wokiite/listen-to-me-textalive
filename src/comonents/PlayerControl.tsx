import React, { useCallback, useState, useEffect } from "react";
import { PlayerSeekbar } from "textalive-react-api";

export const PlayerControl: React.FC<any> = ({ disabled, player }) => {
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    const listener = {
      onPlay: () => setStatus("play"),
      onPause: () => setStatus("pause"),
      onStop: () => setStatus("stop"),
    };
    player.addListener(listener);
    return () => {
      player.removeListener(listener);
    };
  }, [player]);

  const handlePlay = useCallback(
    () => player && player.requestPlay(),
    [player]
  );
  const handlePause = useCallback(
    () => player && player.requestPause(),
    [player]
  );
  const handleStop = useCallback(
    () => player && player.requestStop(),
    [player]
  );

  return (
    <div className="control">
      <button onClick={status !== "play" ? handlePlay : handlePause}>
        {status !== "play" ? "再生" : "一時停止"}
      </button>
      <button onClick={handleStop}>停止</button>
      <div className="seekbar">
        <PlayerSeekbar player={!disabled && player} />
      </div>
    </div>
  );
};

export default PlayerControl;
