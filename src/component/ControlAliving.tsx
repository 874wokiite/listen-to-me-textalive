import React from "react";
import AlivingButton from "./AlivingButton";
import Heart from "./Heart";

export const ControlAliving: React.FC<any> = ({ onAliveChange }) => {
  return (
    <div className="aliving-control fontsize__caption">
      <div className="aliving-control__interaction">
        <Heart />
        <AlivingButton onAliveChange={onAliveChange} />
      </div>
    </div>
  );
};

export default ControlAliving;
