import Head from "next/head";
import { useState } from "react";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Button from "../components/Button";
// Force deployment - mobile layout improvements and Qport rebranding
import Footer from "../components/Footer";
import data from "../data/portfolio.json";

const assetsBaseUrl = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "/assets";

const heroPreviewImage = `${assetsBaseUrl}/screen.png`;
const followRoutesImage = `${assetsBaseUrl}/Follow Recorded Routes.png`;
const bookingProgressSteps = [
  "Submitting request",
  "Sending email",
  "Demo link sent",
];
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
    image: `${assetsBaseUrl}/Start Route Recording.png`,
    imageAlt: "Qport app ready to start route recording",
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
    image: `${assetsBaseUrl}/Save the Route.png`,
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
  {
    title: "Log route feedback instantly",
    description:
      "Capture on-the-go notes about obstructions or delays and sync them with dispatch in real time.",
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
      "Navigate oversized mining equipment safely to extraction sites with intelligent route planning.",
    stats: ["40+ ton loads", "Remote site access"],
  },
  {
    title: "Construction Projects",
    subtitle: "Crane & Excavator Delivery",
    description:
      "Transport construction machinery to job sites using optimized heavy cargo routes.",
    stats: ["Heavy machinery", "Job site delivery"],
  },
  {
    title: "Energy & Utilities",
    subtitle: "Turbine Component Transport",
    description:
      "Deliver wind turbines and heavy infrastructure to renewable energy sites.",
    stats: ["Turbine components", "Energy site access"],
  },
  {
    title: "Oil & Gas",
    subtitle: "Drilling Equipment Routes",
    description:
      "Safe transport of heavy drilling equipment to remote oil and gas locations.",
    stats: ["Remote access", "Challenging terrain"],
  },
];

const Home = () => {
  const storyVideoUrl = `${assetsBaseUrl}/Video_Concept_Heavy_Cargo_Navigation (1).mp4`;
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "", simulated: false });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.state !== "idle") {
      setFormStatus({ state: "idle", message: "", simulated: false });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "" });
    setFormStatus({ state: "idle", message: "", simulated: false });
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (formStatus.state === "loading") return;
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormStatus({ state: "error", message: "Please provide both your name and email.", simulated: false });
      return;
    }

    setFormStatus({ state: "loading", message: "Sending your demo link...", simulated: false });

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "cta-card" }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to send demo link right now.");
      }

      if (typeof window !== "undefined") {
        const dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
        if (!Array.isArray(window.dataLayer)) {
          window.dataLayer = dataLayer;
        }
        dataLayer.push({
          event: "book_demo_submitted",
          simulated: Boolean(payload?.simulated),
        });
      }

      setFormStatus({
        state: "success",
        message: payload?.message || "Check your inbox for the booking link.",
        simulated: Boolean(payload?.simulated),
      });
      setFormData({ name: "", email: "" });
    } catch (error) {
      setFormStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again in a moment.",
        simulated: false,
      });
    }
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Qport | Heavy Cargo Route Intelligence</title>
        <meta
          name="description"
          content="Automate heavy cargo logistics with intelligent route recording, proven route libraries, and turn-by-turn guidance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero */}
        <section className="mt-20 grid gap-16 laptop:grid-cols-12 laptop:items-center min-h-[80vh] laptop:min-h-[70vh]">
          <div className="space-y-6 laptop:col-span-6">
            <div className="flex items-center gap-4 justify-center laptop:justify-start mb-4">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-medium text-blue-700">
                Early Access Available
              </span>
            </div>
            <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl leading-tight">
              The Future of<br />
              <span className="text-blue-600">Heavy Cargo Navigation</span>
            </h1>
            <p className="max-w-xl text-lg opacity-80 leading-relaxed">
              Revolutionary GPS-precise route intelligence for heavy cargo operators.
              Record proven paths, eliminate guesswork, and navigate oversized loads with confidence.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap gap-6 text-sm opacity-70 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Centimeter-level accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Offline navigation ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Purpose-built for heavy cargo</span>
              </div>
            </div>
            <div className="flex flex-col tablet:flex-row gap-3">
              <Button
                type="primary"
                classes="px-8 py-4 text-base font-semibold"
                onClick={() => {
                  document.getElementById("book-your-demo")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                }}
              >
                Request Early Access
              </Button>
              <Button
                classes="px-8 py-4 text-base border-2 border-slate-300 hover:border-slate-400"
                onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="text-xs opacity-60 mt-4">
              Early access program • Join the beta • Available on iOS & Android
            </div>
          </div>
          <div className="laptop:col-span-6">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-xl">
                <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
                  <div className="text-center tablet:text-left">
                    <h3 className="text-lg font-semibold">See Qport in Action</h3>
                    <p className="text-sm opacity-70">
                      Watch how our GPS-precise route recording technology transforms heavy cargo navigation
                      from guesswork into reliable, repeatable operations.
                    </p>
                    <div className="flex items-center justify-center tablet:justify-start gap-4 mt-2 text-xs opacity-60">
                      <span>Record once, navigate forever</span>
                      <span>Built for heavy cargo</span>
                    </div>
                  </div>
                  <div className="flex justify-center tablet:justify-end">
                    <Button
                      classes="w-full tablet:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg"
                      onClick={() => document.getElementById("hero-video")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className="text-white font-bold">Watch Demo</span>
                    </Button>
                  </div>
                </div>
                <div id="hero-video" className="mt-4 aspect-video w-full overflow-hidden rounded-2xl">
                  <video
                    src={storyVideoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full rounded-2xl object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* How it works */}
        <section id="how-it-works" className="mt-32">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">How Qport Works</h2>
            <p className="mt-3 opacity-70">
              Follow the three-step flow that powers dependable heavy cargo route intelligence in the field.
            </p>
          </div>
          <div className="mt-12 grid gap-10 laptop:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-xs uppercase tracking-widest text-[#0B5CF5] opacity-80 block">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm opacity-80">{step.description}</p>
                <div className="mt-4 flex justify-center">
                  <div className="step-preview">
                    {step.image ? (
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="step-preview__image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="step-preview__placeholder">Visual coming soon</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Product Demo - Enhanced Layout */}
        <section id="features" className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Complete Heavy Cargo Navigation Solution</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              From route recording to navigation execution - see how Qport transforms heavy cargo logistics with precision GPS technology and intelligent route management.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
            </div>

            <div className="grid gap-8 laptop:grid-cols-2">
              {followFeatures.map((feature, index) => (
                <div key={feature.title} className="group relative">
                  <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                        <p className="text-base opacity-80 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Why Qport - Enhanced Design */}
        <section id="why" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Qport?</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Purpose-built technology that eliminates route uncertainty and transforms heavy cargo logistics from guesswork into precision operations.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="group relative overflow-hidden"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
                  {/* Feature Tag */}
                  <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-700 mb-4">
                    {advantage.tag}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">{advantage.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{advantage.description}</p>

                  {/* Visual Enhancement */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"></div>
                  </div>

                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Industries - Enhanced Design */}
        <section id="industries" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Built for Every Heavy Cargo Challenge</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Specialized solutions designed for the industries that move the world's heaviest and most critical cargo.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="group relative"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
                  {/* Industry Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800">{industry.title}</h3>
                      <p className="text-blue-600 font-medium text-sm mt-1">{industry.subtitle}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-indigo-500"></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6">{industry.description}</p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-2">
                    {industry.stats.map((stat, statIndex) => (
                      <span
                        key={stat}
                        className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* CTA */}
        <section
          id="book-your-demo"
          className="mt-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white"
        >
          <div className="grid gap-8 laptop:grid-cols-2 laptop:items-center">
            <div className="space-y-4 text-left laptop:text-left">
              <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                Early Access Program Now Open
              </div>
              <h2 className="text-3xl font-semibold">
                Be Part of the Heavy Cargo Revolution
              </h2>
              <p className="text-lg opacity-90">
                Join forward-thinking logistics companies who are shaping the future of heavy cargo navigation.
                Get early access to Qport and help us build the perfect solution.
              </p>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Free during beta period</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Direct input on product development</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>Priority support and training</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">Join the Beta Program</h3>
              <p className="mt-2 text-sm opacity-80">
                Get early access and help shape the future of heavy cargo navigation.
              </p>
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-70">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/60 focus:border-white focus:bg-white/20 focus:outline-none transition-all duration-200 shadow-sm"
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/60 focus:border-white focus:bg-white/20 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-3 text-sm items-center tablet:flex-row tablet:justify-end tablet:items-center">
                  <Button
                    type="primary"
                    classes="w-full tablet:w-auto bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-sm font-semibold px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1"
                    onClick={handleSubmit}
                    disabled={formStatus.state === "loading"}
                  >
                    {formStatus.state === "loading" ? "Submitting..." : "Request Early Access"}
                  </Button>
                  <Button
                    classes="w-full tablet:w-auto order-2"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
                {formStatus.state === "success" && (
                  <p className="booking-feedback booking-feedback--success">
                    ✅ Demo link sent! Check your inbox for scheduling details.
                  </p>
                )}
                {formStatus.state === "error" && (
                  <p className="booking-feedback booking-feedback--error">{formStatus.message}</p>
                )}
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
