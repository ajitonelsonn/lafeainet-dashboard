// app/contact/page.tsx
"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
            <div className="w-full md:w-1/3">
              <img
                src="/ajito.jpeg"
                alt="Profile Photo"
                className="rounded-full w-48 h-48 mx-auto"
              />
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ajito Nelson Lucio da Costa
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">
                IT Specialist (Big Data) | AI Enthusiast
              </h2>
              <p className="text-gray-600 mb-4">
                As a native Tetum speaker, I bring a unique perspective to
                Timor-Leste's growing tech ecosystem.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <a
                    href="mailto:8997ajito@gmail.com"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    lafaekaiajito@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <a
                    href="tel:+67074062553"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    +670 76** ****
                  </a>
                </div>
                <div>
                  <span className="text-gray-600">LinkedIn:</span>
                  <a
                    href="https://www.linkedin.com/in/ajitonelson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    linkedin.com/in/ajitonelson
                  </a>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2">Dili, Timor-Leste</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Languages
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Tetum</span>
                  <span className="text-gray-600">Native or Bilingual</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>English</span>
                  <span className="text-gray-600">Professional Working</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Indonesian</span>
                  <span className="text-gray-600">Limited Working</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Portuguese</span>
                  <span className="text-gray-600">Elementary</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Big Data Engineering
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Artificial Intelligence (AI)
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
