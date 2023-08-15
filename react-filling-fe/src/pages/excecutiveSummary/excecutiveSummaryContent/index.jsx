import React from "react";
import Maps from "./maps";
import ChartNE from "./chartNe";
import SummaryNE from "./summaryNe";

function index() {
  return (
    <>
      <div className="container-coreboardband">
        <SummaryNE/>
      </div>
      <div className="container-coreboardband">
        <Maps />
        <ChartNE />
      </div>
    </>
  );
}

export default index;
