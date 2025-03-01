// components/Footer.tsx
import { Github, Mail, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About NetDash TLS
            </h3>
            <p className="text-gray-600 mb-4">
              NetDash TLS provides real-time network performance analytics
              across Timor-Leste, helping users make informed decisions about
              their network connectivity needs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/ajitonelsonn"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:lafaekaiajito@gmail.com"
                className="text-gray-600 hover:text-gray-900"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://lafeainet-report.vercel.app/"
                target="_blank"
                className="text-gray-600 hover:text-gray-900"
              >
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Network Statistics
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-600 hover:text-blue-600">
                  Coverage Map
                </Link>
              </li>
              <li>
                <Link
                  href="https://netrep-tls.vercel.app/"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Submit Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} NetDash TLS. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">
                Made with ❤️ for Timor-Leste
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
