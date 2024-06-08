import React from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

interface AlivingProps {
  alivingValue: number;
}

export const AlivingButton: React.FC<AlivingProps> = ({ alivingValue }) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "Alive";
  const { rive, RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Aliving",
  });
  const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  if (animation) {
    animation.value = alivingValue;
  }

  return (
    <div>
      <RiveComponent className="aliving-button" />
    </div>
  );
};

export default AlivingButton;
