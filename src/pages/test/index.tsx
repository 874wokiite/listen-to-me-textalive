import React from "react";
import ReactDOM from "react-dom";
import Body from "@/component/Body";
import Layout from "@/component/Layout";
import MikuAnimation from "@/component/MikuAnimation";
import Body3 from "@/component/Body3";
// import LogApp from "@/components/LogApp";

const App = () => {
  return (
    <div className="layout__background">
      <div className="layout__control-area">
        <Body3 />
      </div>
    </div>
  );
};

export default App;
