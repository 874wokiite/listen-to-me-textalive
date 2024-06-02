import React from "react";
import { useRive } from "@rive-app/react-canvas";

export const Loading = () => {
  const { RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: "State Machine 1",
    artboard: "Loading",
  });
  return (
    <div className="fontsize__body loading">
      <RiveComponent className="loading__animation" />
      Loading...
    </div>
  );
};

export default Loading;
