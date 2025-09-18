import React from "react";
import data from "../../data/portfolio.json";

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

const supportLinks = [
  { label: "Documentation", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 py-12 text-sm dark:border-slate-800" id="contact">
      <div className="container mx-auto grid gap-10 px-4 laptop:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold">QPort</h2>
          <p className="mt-3 max-w-sm opacity-70">
            Heavy cargo route intelligence platform helping logistics companies navigate oversized loads to remote destinations safely and efficiently.
          </p>
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
      </div>
      <div className="container mx-auto mt-10 flex flex-wrap items-center justify-between gap-4 px-4 text-xs opacity-70">
        <span>Built for heavy cargo logistics</span>
        <span>System operational</span>
        <span>© 2024 QPort. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
