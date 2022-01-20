/**
 * UNUSED
 */
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface Props { }

const parts = [
  <div
    className="text-center p-8 text-white"
    style={{ backgroundColor: "#FF877A" }}
    key={"carousel-1"}
  >
    <div
      className="text-6xl my-8"
      style={{ fontFamily: "fieldwork, sans-serif" }}
    >
      80%
    </div>
    <div className="mb-8">
      of patients found online treatment to be
      <br /> more effective than face-to-face
      <br /> treatment
    </div>
    <div className="mt-2 text-xs">
      Source:{" "}
      <a
        href="https://www.liebertpub.com/doi/abs/10.1089/tmj.2016.0114?journalCode=tmj"
        className="underline hover:no-underline"
      >
        Journal of Telemedicine
      </a>
    </div>
  </div>,
  <div
    className="text-center p-8"
    style={{
      backgroundColor: "#F8AF99",
    }}
    key={"carousel-2"}
  >
    <div
      className="text-6xl my-8"
      style={{ fontFamily: "fieldwork, sans-serif" }}
    >
      98%
    </div>
    <div className="mb-8">
      of patients found online treatment to be
      <br /> more convenient than face-to-face
      <br /> treatment
    </div>
    <div className="mt-2 text-xs">
      Source:{" "}
      <a
        href="https://onlinelibrary.wiley.com/doi/abs/10.1002/jclp.1056"
        className="underline hover:no-underline"
      >
        Journal of Clinical Psychiatry
      </a>
    </div>
  </div>,
  <div
    className="text-center p-8"
    style={{ backgroundColor: "#FDD2C5" }}
    key={"carousel-3"}
  >
    <div
      className="text-6xl my-8"
      style={{ fontFamily: "fieldwork, sans-serif" }}
    >
      76%
    </div>
    <div className="mb-8">
      more patients experienced a clinically
      <br /> significant change within 3 weeks of
      <br /> telemedicine treatment
    </div>
    <div className="mt-2 text-xs">
      Source:{" "}
      <a
        href="https://www.liebertpub.com/doi/abs/10.1089/tmj.2016.0114?journalCode=tmj"
        className="underline hover:no-underline"
      >
        Journal of Telemedicine
      </a>
    </div>
  </div>,
];

const ProvenResults: React.FC<Props> = () => {
  return (
    <div>
      <div className="md:hidden">
        <AliceCarousel
          mouseTracking
          items={parts}
          responsive={{ 0: { items: 1 } }}
          controlsStrategy="alternate"
          disableButtonsControls
          disableDotsControls
          disableSlideInfo
        />
      </div>
      <div className="hidden md:block">
        <div className="grid grid-cols-3">{parts}</div>
      </div>
    </div>
  );
};

export default ProvenResults;
