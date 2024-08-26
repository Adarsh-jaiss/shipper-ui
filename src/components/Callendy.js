import React from "react";
import { InlineWidget } from "react-calendly";

function Callendy() {
  return (
    <div className="container mx-auto p-3 my-20 flex gap-5 flex-col justify-center items-center">
      <h1 className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Want to discuss something? Schedule a call!
      </h1>

      <div
        className="w-full h-full
      "
      >
        <InlineWidget
          iframeTitle="Calendly"
          pageSettings={{
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "00a2ff",
            textColor: "4d5055",
            hideGdprBanner: false,
            backgroundColor: "ffffff",
          }}
          styles={{
            height: "800px",
          }}
          url="https://calendly.com/adarsh_jaiswal/quick-chat"
        />
      </div>
    </div>
  );
}

export default Callendy;
