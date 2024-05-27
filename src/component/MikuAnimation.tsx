import React from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

interface MikuAnimationProps {
  setMikuValue: number;
}

export const MikuAnimation: React.FC<MikuAnimationProps> = ({
  setMikuValue,
}) => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "EmotionAmount";
  const { rive, RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "MikuAnimation_SP",
  });
  const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  if (animation) {
    animation.value = setMikuValue;
  }

  return (
    <div className="miku-animation">
      <div className="miku-animation__image">
        <RiveComponent />
      </div>
    </div>
  );
};

export default MikuAnimation;
