import React from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

interface ControlPlayPauseProps {
  setPlayPauseValue: number;
}

export const ControlPlayPause: React.FC<ControlPlayPauseProps> = ({
  setPlayPauseValue,
}) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "PlayPauseValue";
  const { rive, RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "ControlPlayPause",
  });
  const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  if (animation) {
    animation.value = setPlayPauseValue;
  }

  return (
    <div className="control-play-pause">
      <RiveComponent />
    </div>
  );
};

export default ControlPlayPause;
