"use client";

import FuzzyText from "@/components/FuzzyText";
export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        color="black"
        fontSize="clamp(4rem, 12vw, 12rem)"
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.1}
        hoverIntensity={0.3}
        enableHover={true}
        color="black"
        fontSize="clamp(1.5rem, 4vw, 4rem)"
      >
        Not Found
      </FuzzyText>
    </div>
  );
}
