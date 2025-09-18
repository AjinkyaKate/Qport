import Head from "next/head";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";
import data from "../data/portfolio.json";

const assetsBaseUrl = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "/assets";

const steps = [
  {
    step: "Step 1",
    title: "Start Route Recording",
    description:
      "Initialize recording mode and begin capturing your heavy cargo route with GPS precision.",
    bullets: [
      "One-tap route recording",
      "GPS precision initialization",
      "Heavy cargo route setup",
    ],
    image: `${assetsBaseUrl}/recording-preview.png`,
    imageAlt: "QPort app ready to start route recording",
  },
  {
    step: "Step 2",
    title: "Trace Drive the Route",
    description:
      "Drive the actual route while the app records every turn, elevation, and critical waypoint.",
    bullets: [
      "Real-time GPS tracking",
      "Automatic waypoint capture",
      "Live route visualization",
    ],
    image: `${assetsBaseUrl}/trace-preview.png`,
    imageAlt: "Live route tracking while driving",
  },
  {
    step: "Step 3",
    title: "Save the Route",
    description:
      "Complete recording and save the route to your library for future heavy cargo deliveries.",
    bullets: [
      "Route completion confirmation",
      "Automatic route library storage",
      "Route metadata tagging",
    ],
    image: `${assetsBaseUrl}/save-preview.png`,
    imageAlt: "Save completed route recording",
  },
];


const followFeatures = [
  {
    title: "Select from route library",
    description:
      "Browse your team's proven routes with detailed metadata and selection filters.",
  },
  {
    title: "Get route details and metrics",
    description:
      "Review distance, time, difficulty level, and cargo specifications before departure.",
  },
  {
    title: "Start following turn-by-turn",
    description:
      "Navigate with confidence using visual guidance optimized for heavy cargo routes.",
  },
];

const advantages = [
  {
    title: "GPS Precision Tracking",
    description:
      "Record routes with centimeter-level accuracy for heavy cargo navigation confidence.",
    tag: "Centimeter accuracy",
  },
  {
    title: "Route Intelligence Library",
    description:
      "Build a searchable database of proven heavy cargo routes with detailed metadata.",
    tag: "Proven route database",
  },
  {
    title: "Offline Navigation",
    description:
      "Navigate recorded routes even without cellular coverage in remote locations.",
    tag: "Works without signal",
  },
  {
    title: "Heavy Cargo Optimized",
    description:
      "Purpose-built for oversized loads with clearance and weight considerations.",
    tag: "Built for heavy cargo",
  },
];

const industries = [
  {
    title: "Mining Operations",
    subtitle: "Heavy Equipment to Remote Sites",
    description:
      "Navigate oversized mining equipment safely to extraction sites with proven route intelligence.",
    stats: ["40+ ton loads", "Equipment transported safely"],
  },
  {
    title: "Construction Projects",
    subtitle: "Crane & Excavator Delivery",
    description:
      "Transport construction machinery to job sites using validated heavy cargo routes.",
    stats: ["99% success rate", "On-time deliveries"],
  },
  {
    title: "Energy & Utilities",
    subtitle: "Turbine Component Transport",
    description:
      "Deliver wind turbines and heavy infrastructure to renewable energy sites.",
    stats: ["500+ routes", "Proven energy site access"],
  },
  {
    title: "Oil & Gas",
    subtitle: "Drilling Equipment Routes",
    description:
      "Safe transport of heavy drilling equipment to remote oil and gas locations.",
    stats: ["Remote access", "Previously unreachable sites"],
  },
];

const Home = () => {
  const storyVideoUrl = "https://www.youtube.com/embed/0hTGHbWUXuk";

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>QPort | Heavy Cargo Route Intelligence</title>
        <meta
          name="description"
          content="Automate heavy cargo logistics with intelligent route recording, proven route libraries, and turn-by-turn guidance."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero */}
        <section className="mt-16 grid gap-16 laptop:grid-cols-12 laptop:items-center">
          <div className="space-y-6 laptop:col-span-6">
            <span className="inline-flex items-center rounded-full border border-slate-300 px-4 py-1 text-xs uppercase tracking-widest opacity-70">
              Automate Heavy Cargo
            </span>
            <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
              Automate Heavy Cargo, Unlock Route Intelligence
            </h1>
            <p className="max-w-xl text-lg opacity-80">
              Intelligent route recording and following that streamlines your heavy cargo logistics — record proven paths, eliminate route failures, and achieve operational excellence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="primary">Book a Demo Now</Button>
              <Button onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="laptop:col-span-6">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">What We Solve</h3>
                    <p className="text-sm opacity-70">
                      See how QPort removes guesswork from heavy cargo logistics with reliable route intelligence.
                    </p>
                  </div>
                  <Button onClick={() => document.getElementById("hero-video")?.scrollIntoView({ behavior: "smooth" })}>
                    Watch Video
                  </Button>
                </div>
                <div id="hero-video" className="mt-4 aspect-video w-full overflow-hidden rounded-2xl">
                  <iframe
                    src={`${storyVideoUrl}?autoplay=1&mute=1&playsinline=1&rel=0`}
                    title="QPort story video"
                    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-2xl border-0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">How QPort Works</h2>
            <p className="mt-3 opacity-70">
              Follow the three-step flow that powers dependable heavy cargo route intelligence in the field.
            </p>
          </div>
          <div className="mt-12 grid gap-10 laptop:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm text-center"
              >
                <span className="text-xs uppercase tracking-widest text-[#0B5CF5] opacity-80 block">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm opacity-80">{step.description}</p>
                <div className="mt-4 flex justify-center">
                  <div className="device-shell device-shell--card">
                    <div className="device-shell__screen">
                      {step.image ? (
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          className="device-shell__image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="device-shell__placeholder">Visual coming soon</div>
                      )}
                      <div className="device-shell__glare" aria-hidden="true"></div>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-1 text-sm opacity-80 text-center">
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        {/* Follow recorded routes */}
        <section id="features" className="mt-24 grid gap-10 laptop:grid-cols-2 laptop:items-center">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
            <h3 className="text-2xl font-semibold">Follow Recorded Routes</h3>
            <p className="mt-3 text-sm opacity-80">
              Navigate heavy cargo using proven routes with turn-by-turn guidance and route intelligence.
            </p>
            <div className="mt-6 h-64 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" aria-label="Follow recorded routes"></div>
          </div>
          <div className="space-y-6">
            {followFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-slate-200 p-5">
                <h4 className="text-lg font-semibold">{feature.title}</h4>
                <p className="mt-2 text-sm opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why QPort */}
        <section id="why" className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Why QPort?</h2>
            <p className="mt-3 opacity-70">
              Purpose-built features that eliminate route uncertainty for heavy cargo logistics.
            </p>
          </div>
          <div className="mt-12 grid gap-6 laptop:grid-cols-2">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm"
              >
                <span className="text-xs uppercase tracking-widest opacity-60">
                  {advantage.tag}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{advantage.title}</h3>
                <p className="mt-2 text-sm opacity-80">{advantage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Built for Every Heavy Cargo Challenge</h2>
            <p className="mt-3 opacity-70">
              Specialized solutions for industries that move the world&rsquo;s heaviest cargo.
            </p>
          </div>
          <div className="mt-12 grid gap-8 laptop:grid-cols-2">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{industry.title}</h3>
                <p className="text-sm font-medium opacity-70">{industry.subtitle}</p>
                <p className="mt-3 text-sm opacity-80">{industry.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-widest opacity-60">
                  {industry.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-slate-300 px-3 py-1">
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white">
          <div className="grid gap-8 laptop:grid-cols-2 laptop:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">
                Ready to Modernize Your Heavy Cargo Logistics?
              </h2>
              <p className="text-sm opacity-80">
                Join industry leaders safely navigating oversized loads to remote destinations with proven route intelligence.
              </p>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• Custom solution</li>
                <li>• Industry expertise</li>
                <li>• Proven results</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">Book Your Demo</h3>
              <p className="mt-2 text-sm opacity-80">
                Get personalized route intelligence for your heavy cargo operations.
              </p>
              <form className="mt-4 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-70">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="mt-1 w-full rounded-md border border-white/40 bg-transparent p-2 text-sm focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-70">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="mt-1 w-full rounded-md border border-white/40 bg-transparent p-2 text-sm focus:border-white focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-3 text-sm">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.currentTarget.closest("form")?.reset();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open("mailto:hello@quickport.app", "_blank");
                    }}
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
