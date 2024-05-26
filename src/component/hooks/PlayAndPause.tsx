import { useCallback, useState, useEffect } from "react";

export const usePlayAndPause = (player: any) => {
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    if (!player) return;
    const listener = {
      onPlay: () => setStatus("play"),
      onPause: () => setStatus("pause"),
    };
    player.addListener(listener);
    return () => {
      player.removeListener(listener);
    };
  }, [player]);

  const togglePlayPause = useCallback(() => {
    if (player) {
      status === "play" ? player.requestPause() : player.requestPlay();
    }
  }, [player, status]);

  return { togglePlayPause, status };
};

export default usePlayAndPause;
