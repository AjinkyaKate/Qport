import React from "react";

const ServiceCard = ({ name, description }) => {
  return (
    <div className="link w-full rounded-lg p-4 transition-transform duration-300 ease-out hover:scale-105 hover:bg-slate-50">
      <h1 className="text-3xl font-semibold text-slate-900">{name || "Heading"}</h1>
      <p className="mt-5 text-xl text-slate-500">
        {description ||
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
      </p>
    </div>
  );
};

export default ServiceCard;
