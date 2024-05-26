import React from "react";
import RiveComponent from "@rive-app/react-canvas";
export const Loading = () => {
  return (
    <div className="fontsize__body loading">
      <RiveComponent
        src="/images/mikuanimation.riv"
        className="loading__animation"
      />
      Loading...
    </div>
  );
};

export default Loading;
