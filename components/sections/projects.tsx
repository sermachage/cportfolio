"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import React from "react";

// Added category property to each project
const projects = [
  {
    id: 1,
    title: "File Manager",
    description: "A robust backend API for a file management system. This project implements user authentication, file upload/download functionality, permissions management, and image thumbnail generation.",
    demo: "null",
    github: "https://github.com/machage9603/files_manager",
    image: "/files.png",
    category: "Backend",
    techStack: ["Node.js", "Express", "MongoDB", "Redis"]
  },
  {
    id: 2,
    title: "KaziPro",
    description: "A project management application. This platform allows teams to collaborate, manage projects, and track tasks efficiently.",
    demo: "null",
    github: null,
    image: "/kazipro.png",
    category: "Full Stack",
    techStack: ["React", "Next.js", "TypeScript", "PostgreSQL"]
  },
  {
    id: 3,
    title: "OmariShot",
    description: "A photographer's portfolio landing page.",
    demo: "https://omarishot.vercel.app/",
    github: null,
    image: "/tresses.png",
    category: "Frontend",
    techStack: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "Tresses",
    description: "A full fledged eyewear E-commerce store with payment intergration.",
    demo: "null",
    github: null,
    image: "/adornment.png",
    category: "Full Stack",
    techStack: ["React", "Node.js", "Stripe", "MongoDB"]
  },
  {
    id: 5,
    title: "READMEaker",
    description: "A README editor/generator. This project helps developers create README files with assistance of ready made section templates and AI.",
    demo: "https://readme.works/",
    github: null,
    image: "/readmeaker.png",
    category: "Full Stack",
    techStack: ["Next.js", "TypeScript", "OpenAI", "Tailwind"]
  },
  {
    id: 6,
    title: "Connect 4",
    description: "My version of the connect 4 game with two players. This classic game implementation allows two players to compete against each other in a strategic battle to connect four of their pieces in a row.",
    demo: "https://react-project-rouge-kappa.vercel.app/",
    github: null,
    image: "/connectfour.png",
    category: "Frontend",
    techStack: ["React", "JavaScript", "CSS3"]
  },
];

const techStack = [
  {
    name: "Go",
    url: "https://golang.org/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Google Cloud",
    url: "https://cloud.google.com/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Docker",
    url: "https://www.docker.com/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg",
  },
  {
    name: "Kubernetes",
    url: "https://kubernetes.io/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain-wordmark.svg",
  },
  {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg",
  },
  {
    name: "gRPC",
    url: "https://grpc.io/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/grpc/grpc-original.svg",
  },
  {
    name: "Git",
    url: "https://git-scm.com/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    url: "https://reactjs.org/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
  },
];

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevProject();
    } else if (e.key === 'ArrowRight') {
      nextProject();
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Frontend":
        return "bg-blue-500/90 border-blue-400";
      case "Backend":
        return "bg-green-500/90 border-green-400";
      case "Full Stack":
        return "bg-purple-500/90 border-purple-400";
      default:
        return "bg-gray-500/90 border-gray-400";
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-6 py-32 lg:px-12 xl:px-20 2xl:px-32"
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
            <span className="text-green-400 text-lg font-mono font-semibold">02.</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Recent Projects
            </h2>
            <div className="flex-1 h-px bg-gray-800 ml-6"></div>
          </div>
        </motion.div>

          {/* Projects Carousel */}
          <div
            className="relative mb-20"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-roledescription="carousel"
            aria-label="Projects showcase"
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentProject * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      className="relative bg-gray-900 rounded-2xl overflow-hidden h-[500px] md:h-[600px] border-2 border-gray-800 group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Project Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          priority={index === currentProject}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20"></div>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col p-6 md:p-8">
                        {/* Top Bar - Links and Category */}
                        <div className="flex justify-between items-start mb-auto">
                          {/* Links */}
                          <div className="flex gap-3">
                            {project.demo && project.demo !== "null" && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-all duration-300"
                                aria-label={`View live demo of ${project.title}`}
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-all duration-300"
                                aria-label={`View source code of ${project.title} on GitHub`}
                              >
                                <Github className="w-5 h-5" />
                              </a>
                            )}
                          </div>

                          {/* Category Badge */}
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white border ${getCategoryColor(project.category)} backdrop-blur-sm`}>
                            {project.category}
                          </span>
                        </div>

                        {/* Bottom Content */}
                        <div className="mt-auto">
                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">
                            {project.description}
                          </p>

                          {/* Tech Stack Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 text-xs font-medium bg-gray-900/60 backdrop-blur-sm border border-gray-700 text-gray-300 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-gray-300 rounded-full hover:bg-gray-900 hover:border-green-400 hover:text-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-gray-300 rounded-full hover:bg-gray-900 hover:border-green-400 hover:text-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    index === currentProject 
                      ? 'w-8 bg-green-400' 
                      : 'w-2 bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={index === currentProject ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32"
          >
            <div className="flex items-center gap-4 mb-12">
              <span className="text-green-400 text-lg font-mono font-semibold">03.</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                Tech Stack
              </h2>
              <div className="flex-1 h-px bg-gray-800 ml-6"></div>
            </div>

            <motion.div
              className="grid grid-cols-5 md:grid-cols-10 gap-6 md:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {techStack.map((tech, index) => (
                <motion.a
                  key={index}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3"
                  aria-label={`Learn more about ${tech.name}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 p-3 bg-gray-900/50 border border-gray-800 rounded-xl transition-all duration-300 group-hover:border-green-400 group-hover:bg-gray-900">
                    <Image
                      src={tech.icon}
                      alt=""
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="64px"
                      className="p-1"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium transition-colors duration-300 group-hover:text-green-400">
                    {tech.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-20 origin-center"
        ></motion.div>
      </div>
    </section>
  );
}