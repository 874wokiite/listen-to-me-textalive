import React, { useState } from "react";
import Body from "./Body";
import { tracks } from "./configs/Tracks";

const Layout: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  return (
    <>
      <div
        className="layout__background"
        style={{
          backgroundImage: `url(${tracks[currentTrackIndex].backgroundPC})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="layout__control-area">
          <Body setCurrentTrackIndex={setCurrentTrackIndex} />
        </div>
      </div>
    </>
  );
};

export default Layout;
