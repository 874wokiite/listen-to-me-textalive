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
    <div className="loading">
      <div className="loading__animation__layout">
        <div className="triangle__top"></div>
        <RiveComponent className="loading__animation" />
        <span className="fontsize__body loading__accent">
          上下スワイプ<span className="loading__text">で楽曲切り替え</span>
        </span>
        <div className="triangle__bottom"></div>
      </div>
      <span className="loading__font fontsize__body">LOADING...</span>
    </div>
  );
};

export default Loading;
