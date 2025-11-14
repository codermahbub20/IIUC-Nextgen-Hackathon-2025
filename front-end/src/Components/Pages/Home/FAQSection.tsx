'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How our Jobnova work?',
    answer:
      'Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.',
  },
  {
    question: 'What is the main process open account?',
    answer:
      'If the distribution of letters and words is random, the reader will not be distracted from making a neutral judgement on the visual impact.',
  },
  {
    question: 'How to make unlimited data entry?',
    answer:
      'Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.',
  },
  {
    question: 'Is Jobnova safer to use with my account?',
    answer:
      'The most well-known dummy text is the "Lorem Ipsum", which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to "proper" Latin.',
  },
];

export default function FAQSection() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Questions & Answers
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-600">
            Search all the open positions on the web. Get your own personalized salary estimate.
            <br className="hidden sm:block" />
            Read reviews on over 30000+ companies worldwide.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Have Question ? Get in touch!
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Start working with Jobnova that can provide everything you need to generate
            awareness, drive traffic, connect.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
          >
            CONTACT US
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}