import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

interface AlivingProps {
  onAliveChange: (value: number) => void;
}

export const AlivingButton: React.FC<AlivingProps> = ({ onAliveChange }) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "Alive";
  const { rive, RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Aliving",
  });
  const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  useEffect(() => {
    if (animation && typeof animation.value === "number") {
      onAliveChange(animation.value);
    }
  }, [animation, onAliveChange]);

  return (
    <div>
      <RiveComponent className="aliving-button" />
    </div>
  );
};

export default AlivingButton;
