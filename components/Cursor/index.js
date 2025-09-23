import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const [mounted, setMounted] = useState(false);
  const innerRef = useRef(null);
  const outerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return undefined;
    }

    const inner = innerRef.current;
    const outer = outerRef.current;

    if (!inner || !outer) {
      return undefined;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let outerX = targetX;
    let outerY = targetY;
    let animationFrame;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      targetX = clientX;
      targetY = clientY;
      inner.style.left = `${clientX}px`;
      inner.style.top = `${clientY}px`;
    };

    const animateOuterCursor = () => {
      outerX += (targetX - outerX) * 0.2;
      outerY += (targetY - outerY) * 0.2;
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      animationFrame = requestAnimationFrame(animateOuterCursor);
    };

    const handleLinkEnter = () => {
      outer.classList.add("cursor--link-hover");
    };

    const handleLinkLeave = () => {
      outer.classList.remove("cursor--link-hover");
    };

    const linkTargets = Array.from(document.querySelectorAll(".link"));

    document.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(animateOuterCursor);
    linkTargets.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkEnter);
      element.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", handleMouseMove);
      linkTargets.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkEnter);
        element.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const inner = innerRef.current;
    const outer = outerRef.current;

    if (!inner || !outer) {
      return;
    }

    inner.style.backgroundColor = "#0B5CF5";
    outer.style.borderColor = "#0B5CF5";
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div ref={outerRef} className="cursor cursor--outer" />
      <div ref={innerRef} className="cursor cursor--inner" />
    </>
  );
};

export default Cursor;
