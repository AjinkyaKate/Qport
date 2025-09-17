import Image from "next/image";
import React from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1200&q=80";

const WorkCard = ({ img, name, description, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative h-96 overflow-hidden rounded-lg transition-all ease-out duration-300"
      >
        <Image
          src={img || fallbackImage}
          alt={name || "Project image"}
          fill
          className="object-cover transition-transform duration-300 ease-out hover:scale-110"
          sizes="(min-width: 1024px) 420px, 80vw"
        />
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
