import React from "react";
import data from "../../data/portfolio.json";

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const supportLinks = [
  { label: "Documentation", href: "/documentation" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 py-12 text-sm dark:border-slate-800" id="contact">
      <div className="container mx-auto grid gap-10 px-4 laptop:grid-cols-4">
        <div>
          <h2 className="text-xl font-semibold">Qport</h2>
          <p className="mt-3 max-w-sm opacity-70">
            Heavy cargo route intelligence platform helping logistics companies navigate oversized loads to remote destinations safely and efficiently.
          </p>

          {/* Social Media Links */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/quickdili-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Follow Qport on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/Quickdili"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Follow Qport on X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 opacity-80">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Support</h3>
          <ul className="mt-3 space-y-2 opacity-80">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Contact</h3>
          <div className="mt-3 space-y-2 opacity-80 text-xs">
            <div>
              <strong>Email:</strong><br />
              <a href="mailto:info@quickdili.com" className="link">info@quickdili.com</a>
            </div>
            <div>
              <strong>Phone:</strong><br />
              <a href="tel:+919673691461" className="link">+91 9673691461</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10 flex flex-wrap items-center justify-between gap-4 px-4 text-xs opacity-70">
        <span>Built for heavy cargo logistics</span>
        <span>System operational</span>
        <span>© 2025 Qport. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
