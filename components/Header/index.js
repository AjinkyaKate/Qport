import { Popover } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const router = useRouter();

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    router.push(href);
  };

  const renderNavButton = (item) => (
    <Button
      key={item.label}
      classes="px-5 py-2"
      onClick={() => handleNavClick(item.href)}
    >
      {item.label}
    </Button>
  );

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-semibold text-lg p-2 laptop:p-0 link"
              >
                QPort
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
            <Popover.Panel className="absolute right-0 z-10 w-11/12 rounded-md bg-white p-4 shadow-md">
              <div className="grid grid-cols-1">
                {navItems.map(renderNavButton)}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div className="nav-shell hidden tablet:block">
        <div className="nav-shell-inner">
          <h1
            onClick={() => router.push("/")}
            className="font-semibold text-lg cursor-pointer"
          >
            QPort
          </h1>
          <div className="flex items-center gap-2">
            {navItems.map(renderNavButton)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
