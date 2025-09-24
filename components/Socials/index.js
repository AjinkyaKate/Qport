import React from "react";
import Button from "../Button";

import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  const handleSocialClick = (social) => {
    if (social.mobileApp) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = social.link;
      } else {
        window.open(social.link, '_blank');
      }
    } else {
      window.open(social.link);
    }
  };

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => handleSocialClick(social)}>
          {social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
