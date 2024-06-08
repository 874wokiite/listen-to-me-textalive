import React from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export const Heart: React.FC<any> = () => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "Trigger 1";
  const { rive, RiveComponent: RiveComponentTouch } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "Heart",
  });
  // const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  return (
    <>
      <div className="heart">
        <RiveComponentTouch
          className="heart__size"
          // onClick={() => animation.fire()}
        />
      </div>
    </>
  );
};

export default Heart;
