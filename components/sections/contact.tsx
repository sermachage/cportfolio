"use client";

import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
import { AiFillLinkedin } from "react-icons/ai";

const socialLinks = [
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com/sermachage",
    color: "hover:text-gray-300",
  },
  {
    name: "LinkedIn",
    icon: AiFillLinkedin,
    url: "https://linkedin.com/in/mikemachage",
    color: "hover:text-blue-400",
  },
  {
    name: "X (Twitter)",
    icon: SiX,
    url: "https://twitter.com/sermachage",
    color: "hover:text-sky-400",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "mikemachage@gmail.com",
          replyTo: formData.email,
          subject: `New Contact Form Message from ${formData.name}`,
          text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Message: ${formData.message}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Failed to send message: ${result.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center px-6 py-32 lg:px-12 xl:px-20 2xl:px-32"
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-800 max-w-xs" />
            <span className="text-green-400 text-lg font-mono font-semibold">05.</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-gray-800 max-w-xs" />
          </div>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? {"I'd"} love to hear from you. Drop me a message and {"I'll"} get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <User className="w-4 h-4 text-green-400" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900 transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Mail className="w-4 h-4 text-green-400" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-gray-900 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green-400 text-gray-950 rounded-lg font-semibold transition-all duration-300 hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center font-medium ${
                    status.includes("success")
                      ? "bg-green-400/10 border border-green-400/30 text-green-400"
                      : status.includes("Failed") || status.includes("error")
                      ? "bg-red-400/10 border border-red-400/30 text-red-400"
                      : "bg-blue-400/10 border border-blue-400/30 text-blue-400"
                  }`}
                >
                  {status}
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                {"Let's"} work together
              </h3>
              <div className="space-y-4 text-gray-400">
                <p className="leading-relaxed">
                  {"I'm"} currently available for freelance work and open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm font-medium text-gray-500 mb-2">Response Time</p>
                  <p className="text-white">Usually within 24 hours</p>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm font-medium text-gray-500 mb-2">Email</p>
                  <a
                    href="mailto:mikemachage@gmail.com"
                    className="text-green-400 hover:text-green-300 transition-colors duration-300"
                  >
                    mikemachage@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 transition-all duration-300 hover:border-green-400 ${social.color} hover:-translate-y-1`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mt-20 origin-center"
        />
      </div>
    </section>
  );
}
