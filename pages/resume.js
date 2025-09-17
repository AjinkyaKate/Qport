import React, { useEffect, useState } from "react";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Socials from "../components/Socials";
import PdfPreview from "../components/PdfPreview";
import data from "../data/portfolio.json";

const Resume = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasResume = Boolean(data.resumePdf);
  const resumeSummary =
    data.aboutText ||
    [data.headerTaglineTwo, data.headerTaglineThree, data.headerTaglineFour]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header />
        <div className="mt-10 flex w-full justify-center">
          <div
            className="w-full max-w-4xl rounded-lg bg-gray-50 p-6 tablet:p-10 shadow-sm"
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">Resume</h1>
              {resumeSummary && (
                <p className="text-base opacity-70">{resumeSummary}</p>
              )}
            </div>
            <div className="mt-6">
              {hasResume ? (
                <PdfPreview src={data.resumePdf} />
              ) : (
                <p className="rounded-md border border-dashed border-slate-300 p-6 text-sm opacity-70 dark:border-slate-700">
                  Add your resume PDF by updating `data/portfolio.json` to display it here instantly.
                </p>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Socials />
              {hasResume && (
                <a
                  href={data.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="link text-sm"
                >
                  Download full resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
