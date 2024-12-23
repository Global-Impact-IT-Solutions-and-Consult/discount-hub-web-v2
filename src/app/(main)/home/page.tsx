import React from "react";
import Hero from "./Hero";
import ByCategory from "./ByCategory";
import LatestArrivals from "./LatestArrivals";
// import Services from "./Services";

const Landing = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* Home */}
      <Hero />
      <ByCategory />
      <LatestArrivals />
      {/* <Services /> */}
    </div>
  );
};

export default Landing;
