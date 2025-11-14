'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import fedex from "../../../assets/Logos/fedex-51.svg";
import walmart from "../../../assets/Logos/walmart-argentina.svg";
import google from "../../../assets/Logos/google-1-1.svg";
import {
  ChartBarIcon,
  PhoneIcon,
  PaintBrushIcon,
  CpuChipIcon,
  VideoCameraIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { Building2, MapPin, Clock, Calendar, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useGetAllJobsQuery } from '../../../redux/features/jobs/jobsApi';
import FAQSection from './FAQSection';

export interface FetchedJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  experienceLevel: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | string;
  description: string;
  applyLink: string;
  careerTrack: string;
  postedAt: string;
}

const trendingCategories = [
  { name: 'Sales Representative', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
  { name: 'Call Center', icon: <PhoneIcon className="h-5 w-5 mr-2" /> },
  { name: 'Graphic Design', icon: <PaintBrushIcon className="h-5 w-5 mr-2" /> },
  { name: 'Computer Operator', icon: <CpuChipIcon className="h-5 w-5 mr-2" /> },
  { name: 'Video Editing', icon: <VideoCameraIcon className="h-5 w-5 mr-2" /> },
  { name: 'Field Sales', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
];

const trustedLogos = [
  { name: 'Dropbox', src: 'https://cdn.worldvectorlogo.com/logos/dropbox-2.svg' },
  { name: 'FedEx', src: fedex },
  { name: 'Walmart', src: walmart },
  { name: 'HubSpot', src: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg' },
  { name: 'Google', src: google },
  { name: 'Airbnb', src: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg' },
];

// Fixed formatDate function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? 'Invalid Date'
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function Banner() {
  const { data } = useGetAllJobsQuery({});
  const jobsData: FetchedJob[] = data?.data || [];
  const [email, setEmail] = useState('');

  return (
    <>
      {/* ==== HERO SECTION ==== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT – Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Explore more than{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  200+ remote job
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-xl">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur
                duis deserunt mollit dolore cillum minim tempor enim.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button className="rounded-lg bg-black px-7 py-3.5 font-semibold text-white hover:bg-gray-800 transition shadow-md">
                  Start Free Trial
                </button>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-gray-600">
                <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  30 Days free trial
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <X className="h-4 w-4 text-indigo-600" />
                  No credit card required
                </motion.span>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Trending Job Categories</h3>
                <div className="flex flex-wrap gap-3">
                  {trendingCategories.map((c, i) => (
                    <motion.a
                      key={c.name}
                      href="#"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition"
                    >
                      {c.icon}
                      {c.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT – Image + Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                alt="Remote worker"
                className="rounded-2xl shadow-2xl w-full object-cover border border-gray-200"
              />

              <motion.div
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 120 }}
                className="absolute -right-6 top-1/4 w-64 rounded-xl bg-white p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    Hey! I’m looking for a <strong>UI/UX designer</strong>
                  </p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200"></div>
                <div className="mt-1 h-2 w-20 rounded-full bg-gray-200"></div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -left-8 top-16"
              >
                <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="Shopify" className="h-12 w-12 drop-shadow-md" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.4 }}
                className="absolute -right-10 top-32"
              >
                <img src="https://cdn.worldvectorlogo.com/logos/slack-1.svg" alt="Slack" className="h-10 w-10 drop-shadow-md" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==== TRUSTED BY SECTION ==== */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Used <span className="text-indigo-600">1000+ company</span> around the world
            </h2>
            <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-14" viewBox="0 0 120 60" fill="none">
              <path d="M 15 50 Q 60 15, 105 50" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
              <path d="M 85 42 L 105 50 L 85 58" stroke="#fbbf24" strokeWidth="5" fill="none" />
            </svg>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10">
            {trustedLogos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all group-hover:shadow-lg group-hover:border-gray-200">
                  <img src={logo.src} alt={logo.name} className="h-10 w-auto mx-auto object-contain" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== JOB CARDS – ULTRA MODERN ==== */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
           Our Latest Job Post 
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
  {jobsData.slice(0,6).map((job, index) => (
    <motion.div
      key={job._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Glow Background on Hover */}
      <div className="absolute inset-0  rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl -z-10"></div>

      {/* Card Container - Equal Height */}
      <div className="h-full bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100/50 transition-all duration-300 group-hover:border-indigo-300 group-hover:shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <Building2 className="w-4 h-4 text-indigo-500" />
              {job.company}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
            job.jobType === 'Full-time' ? 'bg-emerald-100 text-emerald-700' :
            job.jobType === 'Part-time' ? 'bg-amber-100 text-amber-700' :
            job.jobType === 'Internship' ? 'bg-sky-100 text-sky-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {job.jobType}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{job.experienceLevel} Level</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{formatDate(job.postedAt)}</span>
          </div>
        </div>

        {/* Description - Flexible */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {job.description}
        </p>

        {/* Skills */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills?.slice(0, 4).map((skill, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200/50"
              >
                {skill}
              </motion.span>
            ))}
            {job.requiredSkills.length > 4 && (
              <span className="px-3 py-1 text-gray-500 text-xs">+{job.requiredSkills.length - 4}</span>
            )}
          </div>
        </div>

        {/* Footer - Always at Bottom */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {job.careerTrack}
          </span>
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Apply
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* ==== FAQ SECTION ==== */}
      <FAQSection />
    </>
  );
}