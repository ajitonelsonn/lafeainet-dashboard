// app/privacy/page.tsx
"use client";

export default function PrivacyPage() {
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
                This privacy policy is currently under development and may be
                updated. Last updated: March 2025
              </p>
              <p className="text-sm text-red-700">
                This project submit to{" "}
                <a
                  href="https://lablab.ai/event/ai-for-connectivity-hackathon-building-resilient-networks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-900"
                >
                  AI for Connectivity Hackathon II: Building Resilient Networks
                </a>
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Introduction
            </h2>
            <p>
              LafeAINet is committed to protecting your privacy. This policy
              explains how we collect, use, and safeguard your information when
              you use our network monitoring service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Network performance metrics (download speed, upload speed,
                latency)
              </li>
              <li>Device information (browser type, operating system)</li>
              <li>Location data (with your consent)</li>
              <li>Network provider information</li>
              <li>User feedback and comments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                To analyze and improve network performance across Timor-Leste
              </li>
              <li>To generate aggregated statistics and reports</li>
              <li>To identify and resolve network issues</li>
              <li>To improve our service and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Data Protection
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data. Personal information is anonymized where
              possible, and we do not share individual user data with third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <p className="mt-2">
              Email: lafaekaiajito@gmail.com
              <br />
              Address: Dili, Timor-Leste
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500">
              This privacy policy is subject to change. We will notify users of
              any material changes through our website or by other means.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
