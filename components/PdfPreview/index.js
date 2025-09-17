import React, { useMemo, useState } from "react";

const PdfPreview = ({
  src,
  className = "",
  title = "Resume preview",
  height = 480,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeTitle = useMemo(() => `${title}-${Date.now()}`, [title]);

  if (!src) {
    return null;
  }

  const computedHeight = isExpanded ? height * 1.5 : height;

  return (
    <div className={`rounded-lg border border-slate-200 shadow-sm dark:border-slate-700 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-sm dark:border-slate-700">
        <span className="font-medium opacity-80">PDF preview</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className="rounded-md border border-slate-300 px-3 py-1 transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            {isExpanded ? "Shrink" : "Expand"}
          </button>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-slate-300 px-3 py-1 transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Open in new tab
          </a>
          <a
            href={src}
            download
            className="rounded-md border border-slate-300 px-3 py-1 transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Download
          </a>
        </div>
      </div>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 text-sm opacity-80 dark:bg-slate-900/70">
            Loading PDF...
          </div>
        )}
        <iframe
          src={`${src}#view=FitH`}
          title={iframeTitle}
          className="w-full"
          style={{ height: `${computedHeight}px` }}
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default PdfPreview;
