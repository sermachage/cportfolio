"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center px-6 py-32 lg:px-12 xl:px-20 2xl:px-32"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-green-400 text-lg font-mono font-semibold">01.</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              About Me
            </h2>
            <div className="flex-1 h-px bg-gray-800 ml-6"></div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="space-y-5 text-base md:text-lg text-gray-400 leading-relaxed">
            <p>
              A Software Engineer specializing in building scalable, cloud-native applications and distributed systems with{" "}
              <span className="text-green-400 font-medium">Go</span>. I design and build resilient backend services engineered for high performance and availability on the{" "}
              <span className="text-green-400 font-medium">Google Cloud Platform</span>.
            </p>

            <p>
              My project work is focused on solving real-world architectural challenges. I architected and built a complete e-commerce backend using a{" "}
              <span className="text-white font-semibold">microservices</span> approach on{" "}
              <span className="text-green-400 font-medium">Google Kubernetes Engine (GKE)</span>. This platform is designed to handle high-volume transactional loads by allowing core services to scale independently, ensuring system resilience and maintainability.
            </p>

            <p>
              Additionally, I engineered an asynchronous,{" "}
              <span className="text-white font-semibold">event-driven data pipeline</span> capable of ingesting and processing thousands of streaming events in real-time. This system leverages{" "}
              <span className="text-green-400 font-medium">Google Cloud Pub/Sub</span> and <span className="text-green-400 font-medium">Cloud Functions</span> to reliably funnel data into{" "}
              <span className="text-green-400 font-medium">BigQuery</span> for large-scale analytics.
            </p>

            <p>
              I specialize in <span className="text-green-400 font-medium">Go</span> for concurrent systems,{" "}
              <span className="text-green-400 font-medium">Google Cloud</span> for robust infrastructure, and modern architectural patterns like{" "}
              <span className="text-white font-semibold">microservices</span> and <span className="text-white font-semibold">event-driven design</span>. My technical toolkit includes{" "}
              <span className="text-green-400 font-medium">Docker</span>, <span className="text-green-400 font-medium">Kubernetes</span>,{" "}
              <span className="text-green-400 font-medium">gRPC</span>, and <span className="text-green-400 font-medium">PostgreSQL</span>.
            </p>

            <p>
              I am passionate about tackling complex backend problems and am actively seeking a role where I can contribute to building reliable and scalable systems.
            </p>
          </div>
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-20 origin-center"
        ></motion.div>
      </div>
    </section>
  );
}