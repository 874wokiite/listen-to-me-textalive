import React from "react";
import Body from "./Body";

const Layout = () => {
  return (
    <>
      <div className="layout__background">
        <div className="layout__control-area">
          <img
            src="/images/bottom_decoration.png"
            alt="none"
            className="layout__background__bottom"
          />
          <img
            src="/images/top_decoration.png"
            alt="none"
            className="layout__background__top"
          />
          <Body />
        </div>
      </div>
    </>
  );
};

export default Layout;
