import Head from "next/head";
import Link from "next/link";

import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import Button from "../../components/Button";
import data from "../../data/portfolio.json";

const ProjectDetail = ({ project }) => {
  const pageTitle = `${project.title} — ${data.name}`;

  return (
    <div className={`min-h-screen ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={project.summary} />
      </Head>
      <div className="container mx-auto mb-20 px-4 laptop:px-0">
        <Header />
        <article className="mt-12">
          <Link href="/" className="link text-sm opacity-60">
            ← Back to portfolio
          </Link>
          <div className="mt-6 flex flex-col gap-5 laptop:flex-row laptop:items-end">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-widest opacity-60">
                {project.tagline}
              </p>
              <h1 className="mt-3 text-4xl tablet:text-6xl font-semibold">
                {project.title}
              </h1>
            </div>
            <div className="laptop:w-80">
              <p className="text-base opacity-70 leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <img
              src={project.imageSrc}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover"
            />
          </div>

          <section className="mt-12 grid gap-8 laptop:grid-cols-3">
            <div>
              <h2 className="text-sm uppercase tracking-widest opacity-60">
                Focus
              </h2>
              <ul className="mt-4 space-y-2 text-lg opacity-80">
                {project.focus?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest opacity-60">
                Stack
              </h2>
              <ul className="mt-4 space-y-2 text-lg opacity-80">
                {project.stack?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest opacity-60">
                Links
              </h2>
              <div className="mt-4 flex flex-col">
                {project.links?.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="link text-lg"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 space-y-12">
            {project.sections?.map((section) => (
              <div key={section.title}>
                <h3 className="text-2xl font-semibold">{section.title}</h3>
                <div className="mt-4 space-y-4 text-lg opacity-80 leading-relaxed">
                  {section.description?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {section.highlights && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-lg opacity-90">
                    {section.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {project.url && (
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <Button type="primary" onClick={() => window.open(project.url)}>
                Visit Live Site
              </Button>
              <span className="text-sm opacity-60">
                Prefer a quick chat? <a className="link" href="mailto:hello@chetanverma.com">Email me</a>
              </span>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = data.projects
    .filter((project) => Boolean(project.slug))
    .map((project) => ({ params: { slug: project.slug } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const project = data.projects.find((item) => item.slug === params.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;
