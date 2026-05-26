"use client";

import { ArrowRight, Download } from "lucide-react";
import React from "react";
import Image from "next/image";

interface HeroProps {
  isVisible: boolean;
  skills: string[];
  currentSkill: number;
}

export default function Hero({ isVisible, skills, currentSkill }: HeroProps) {
  return (
    <section
      id="home"
      className="relative z-10 flex items-center min-h-screen px-6 py-20 lg:px-12 xl:px-20 2xl:px-32"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column - Content */}
          <div className={`lg:col-span-7 space-y-6 md:space-y-8 lg:space-y-10 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-5 py-2.5">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Available for remote work worldwide</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight">
                <span className="text-gray-600 dark:text-gray-400 block mb-2">Hi, {"I'm"}</span>
                <span className="text-gray-900 dark:text-white font-semibold">Mike Machage</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-light">
A Software Engineer specializing in cloud-native applications and distributed systems. Proven ability to design and build resilient, high-performance services on Google Cloud, demonstrated through projects including a scalable microservices platform on GKE and an event-driven data processing pipeline.
            </p>

            {/* Dynamic Role */}
            <div className="flex flex-wrap items-center gap-2 text-xl md:text-2xl lg:text-3xl font-light">
              <span className="text-gray-600 dark:text-gray-400">I build with</span>
              <span className="text-green-500 dark:text-green-400 font-semibold min-w-[140px] transition-all duration-300">
                {skills[currentSkill]}
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                aria-label="Scroll to projects section"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-green-500 dark:bg-green-400 text-white dark:text-gray-950 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-300 transition-all duration-200 flex items-center justify-center shadow-lg shadow-green-500/20 dark:shadow-green-400/20 hover:shadow-green-500/30 dark:hover:shadow-green-400/30 hover:scale-[1.02]"
              >
                View Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/resume.pdf" 
                download="Resume.pdf"
                className="group border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 dark:hover:border-green-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900/50"
              >
                <Download className="mr-2 w-5 h-5" />
                Resume
              </a>
            </div>
          </div>

          {/* Right Column - Profile & Tech Stack */}
          <div className={`lg:col-span-5 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="space-y-8 lg:space-y-10">
              
              {/* Profile Image Container */}
              <div className="relative group mx-auto lg:mx-0 w-full">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                
                {/* Main Container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-full lg:h-96 xl:h-[420px] rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    <Image 
                      src="/dp.png" 
                      alt="Mike Machage" 
                      className="w-full h-full object-cover object-center"
                      width={320}
                      height={320}
                    /> 
                  </div>
                </div>
              </div>
              {/* Stack */}
              <div className="space-y-5 bg-gray-50 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 lg:p-8">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-semibold">Stack</h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className={`flex items-center gap-3 text-base lg:text-lg transition-all duration-300 group ${
                        currentSkill === index 
                          ? 'text-green-500 dark:text-green-400 translate-x-2' 
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:translate-x-1'
                      }`}
                    >
                      <span className={`text-xl transition-colors ${
                        currentSkill === index ? 'text-green-500 dark:text-green-400' : 'text-gray-300 dark:text-gray-700'
                      }`}>→</span>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}