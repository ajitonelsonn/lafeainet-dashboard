// app/terms/page.tsx
"use client";

export default function TermsPage() {
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
                These Terms of Service are currently under development and may
                be updated. Last updated: March 2024
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
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using LafeAINet, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service.
              These terms constitute a legally binding agreement between you and
              LafeAINet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Service Description
            </h2>
            <p>
              LafeAINet provides network performance monitoring and analysis
              services for Timor-Leste. The service includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Network performance metrics collection and analysis</li>
              <li>Coverage mapping and visualization</li>
              <li>Provider performance comparison</li>
              <li>Historical data tracking and analysis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. User Responsibilities
            </h2>
            <p>Users of LafeAINet agree to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Provide accurate information when submitting reports</li>
              <li>Not misuse or attempt to manipulate the service</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Respect the privacy and rights of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Data Usage
            </h2>
            <p>
              By using LafeAINet, you agree that we may collect and use data as
              described in our Privacy Policy. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Network performance data</li>
              <li>Location data (with consent)</li>
              <li>Device information</li>
              <li>Usage statistics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Service Availability
            </h2>
            <p>
              While we strive to maintain continuous service availability,
              LafeAINet does not guarantee uninterrupted access to the service.
              We reserve the right to modify, suspend, or discontinue the
              service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of LafeAINet are owned by
              LafeAINet and are protected by international copyright, trademark,
              and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              LafeAINet is provided "as is" without any warranties. We are not
              liable for any damages arising from the use or inability to use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Users will
              be notified of significant changes to these terms. Continued use
              of the service after such modifications constitutes acceptance of
              the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="mt-2">
              Email: lafaekaiajito@gmail.com
              <br />
              Address: Dili, Timor-Leste
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500">
              These Terms of Service constitute the entire agreement between
              users and LafeAINet regarding the use of our service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
