// app/faq/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is LafeAINet?",
    answer:
      "LafeAINet is a network monitoring and analysis platform specifically designed for Timor-Leste. It provides real-time insights into network performance, coverage mapping, and quality metrics across different providers in the country.",
  },
  {
    question: "How is the data collected?",
    answer:
      "Data is collected through user-submitted reports, which include network speed tests, quality assessments, and location information. All data collection is transparent and requires user consent.",
  },
  {
    question: "Which network providers are covered?",
    answer:
      "We currently monitor all major network providers in Timor-Leste, including Telemor, Timor Telecom, Telkomcel and others. The platform shows performance metrics and coverage information for each provider.",
  },
  {
    question: "How is the quality score calculated?",
    answer: (
      <div>
        The quality score is calculated using multiple factors including:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Download and upload speeds</li>
          <li>Network latency</li>
          <li>Connection stability</li>
          <li>User sentiment analysis</li>
          <li>Historical performance data</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How often is the data updated?",
    answer:
      "The dashboard is updated in real-time as new reports are submitted. Historical data and analytics are processed and updated every 30 minutes.",
  },
  {
    question: "Can I contribute to the data collection?",
    answer:
      "Yes! You can contribute by submitting network reports through our report submission portal. Your contributions help improve the accuracy and coverage of our network analysis.",
  },
  {
    question: "Is my data kept private?",
    answer:
      "Yes, we take data privacy seriously. Personal information is anonymized, and location data is only collected with explicit consent. Please review our Privacy Policy for more details.",
  },
  {
    question: "How can I interpret the map colors?",
    answer: (
      <div>
        The map uses a color-coding system to indicate network quality:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Green: Excellent quality (8-10)</li>
          <li>Blue: Good quality (6-8)</li>
          <li>Yellow: Fair quality (4-6)</li>
          <li>Red: Poor quality (0-4)</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What time periods can I view data for?",
    answer:
      "You can view data for different time periods including the last 24 hours, 7 days, 30 days, and 90 days. This helps track network performance trends over time.",
  },
  {
    question: "How can I report issues or provide feedback?",
    answer:
      "You can contact us through our support email at lafaekaiajito@gmail.com or use the feedback form in the application. We value your input and continuously work to improve our service.",
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Development Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                This FAQ is currently under development and may be updated. Last
                updated: March 2025
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 py-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
