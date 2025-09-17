import React from "react";
import data from "../../data/portfolio.json";

const Button = ({ children, type, onClick, classes, icon }) => {
  const base =
    "text-sm tablet:text-base px-6 py-2 m-1 laptop:m-2 rounded-full transition-all duration-300 ease-out link";

  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`${base} font-semibold bg-[#0B5CF5] text-white shadow-md shadow-blue-500/30 hover:scale-105 active:scale-100 ${
          data.showCursor && "cursor-none"
        } ${classes}`}
      >
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${base} flex items-center bg-white text-slate-900 border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-100 ${
        data.showCursor && "cursor-none"
      } ${classes}`}
    >
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
