"use client";

import { useState, useEffect } from "react";
import Hero from "./hero";

const skills = ["Go/Gin/GoFr", "Python/Django", "NextJS/TypeScript", "Google Cloud", "PostgreSQL"];

export default function HeroWrapper() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Hero
      isVisible={isVisible}
      skills={skills}
      currentSkill={currentSkill}
    />
  );
}