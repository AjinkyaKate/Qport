import { Popover } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../Button";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Show navbar when at top of page
        if (currentScrollY < 10) {
          setIsVisible(true);
        }
        // Hide when scrolling down, show when scrolling up
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY]);

  const handleNavClick = (href, event) => {
    console.log('handleNavClick called with:', href, 'current path:', router.pathname);

    if (href.startsWith("#")) {
      // Prevent default behavior
      event?.preventDefault();

      // Always redirect to home page with the section hash
      console.log('Redirecting to home page with section:', href);
      window.location.href = `/${href}`;
      return;
    }
    router.push(href);
  };

  const renderNavButton = (item) => (
    <Button
      key={item.label}
      classes="px-5 py-2"
      onClick={(event) => handleNavClick(item.href, event)}
    >
      {item.label}
    </Button>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-transform duration-300 tablet:hidden ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <Popover className="block">
          {({ open }) => (
            <>
              <div className="flex items-center justify-between p-4">
                <h1
                  onClick={() => router.push("/")}
                  className="font-bold text-2xl cursor-pointer tracking-tight"
                >
                  Qport<span className="text-blue-600">.</span>
                </h1>
                <Popover.Button className="p-2">
                  <Image
                    src={`/images/${open ? "cancel.svg" : "menu.svg"}`}
                    alt="Toggle navigation"
                    width={20}
                    height={20}
                  />
                </Popover.Button>
              </div>
              <Popover.Panel className="absolute right-4 top-16 z-10 w-11/12 rounded-md bg-white/95 backdrop-blur-md p-4 shadow-lg border border-slate-200">
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map(renderNavButton)}
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>

      {/* Desktop Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-transform duration-300 hidden tablet:block ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1
              onClick={() => router.push("/")}
              className="font-bold text-2xl cursor-pointer tracking-tight"
            >
              Qport<span className="text-blue-600">.</span>
            </h1>
            <div className="flex items-center gap-2">
              {navItems.map(renderNavButton)}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
