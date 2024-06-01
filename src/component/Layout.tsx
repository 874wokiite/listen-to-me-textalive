import React from "react";
import Body from "./Body";

const Layout = () => {
  return (
    <>
      <div className="layout__background">
        <div className="layout__control-area">
          <Body />
        </div>
      </div>
    </>
  );
};

export default Layout;
