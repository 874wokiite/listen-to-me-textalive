import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export const MikuAnimation = () => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const INPUT_NAME = "EmotionAmount";
  const { rive, RiveComponent } = useRive({
    src: "/images/mikuanimation.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "MikuAnimation",
  });
  const animation = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  return (
    <div className="control-area">
      <div className="miku">
        <RiveComponent />
      </div>
      <div className="aliving-control fontsize__caption">
        <button
          onClick={() => animation && (animation.value = 3)}
          className="aliving-control__button"
        >
          0%
        </button>
        <button
          onClick={() => animation && (animation.value = 2)}
          className="aliving-control__button"
        >
          50%
        </button>
        <button
          onClick={() => animation && (animation.value = 1)}
          className="aliving-control__button"
        >
          100%
        </button>
        <button
          onClick={() => animation && (animation.value = 0)}
          className="aliving-control__button"
        >
          停止
        </button>
      </div>
    </div>
  );
};

export default MikuAnimation;
