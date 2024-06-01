import React, { useEffect } from "react";

export const PlayerControl: React.FC<any> = ({ player }) => {
  // const sliderStyles = {
  //   track: {
  //     backgroundColor: "#ddd",
  //     height: "16px",
  //     borderRadius: "0",
  //   },
  //   active: {
  //     backgroundColor: "#71CCC4",
  //     height: "16px",
  //     borderRadius: "0",
  //   },
  //   thumb: {
  //     backgroundColor: "transparent",
  //     width: "16px",
  //     height: "16px",
  //     borderRadius: "0",
  //     boxShadow: "none",
  //   },
  //   disabled: {
  //     backgroundColor: "#ccc",
  //     borderRadius: "0",
  //   },
  // };

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
          <div className="music-information__seekbar"></div>
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

export default PlayerControl;
