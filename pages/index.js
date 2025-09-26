import Head from "next/head";
import { useState, useEffect } from "react";
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

  // Handle scrolling to section when navigating from other pages or direct URL hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      console.log('Home page loaded with hash:', hash);
      if (hash) {
        // Try multiple times with increasing delays to ensure DOM is ready
        const attempts = [500, 1000, 1500];
        attempts.forEach((delay, index) => {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) {
              console.log(`Scrolling to ${hash} after ${delay}ms`);
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              console.log(`Element ${hash} not found after ${delay}ms`);
            }
          }, delay);
        });
      }
    };

    // Handle hash on page load with a delay to ensure DOM is ready
    setTimeout(handleHashScroll, 100);

    // Also handle hash changes
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

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
            <div className="flex items-center gap-4 justify-start mb-4">
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
                <span>GPS precision tracking</span>
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
            <div className="flex flex-col tablet:flex-row gap-3 items-center">
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
                Book Demo
              </Button>
              <Button
                classes="px-8 py-4 text-base border-2 border-slate-300 hover:border-slate-400"
                onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Features
              </Button>
            </div>

            {/* Trust Indicators */}
          </div>
          <div className="laptop:col-span-6">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-xl">
                <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
                  <div className="text-center tablet:text-left">
                    <h3 className="text-lg font-semibold">See Qport<span className="text-blue-600">.</span> in Action</h3>
                    <p className="text-sm opacity-70">
                      Watch how our GPS-precise route recording technology transforms heavy cargo navigation
                      from guesswork into reliable, repeatable operations.
                    </p>
                    <div className="flex items-center justify-center tablet:justify-start gap-4 mt-2 text-xs opacity-60">
                      <span>Record once, navigate forever</span>
                      <span>Built for heavy cargo</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      classes="w-full tablet:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg text-center"
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
            <h2 className="text-3xl font-semibold">How Qport<span className="text-blue-600">.</span> Works</h2>
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
                        className={`step-preview__image ${step.step === 'Step 3' ? 'step-preview__image--step3' : ''}`}
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
              From route recording to navigation execution - see how Qport. transforms heavy cargo logistics with precision GPS technology and intelligent route management.
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
            <h2 className="text-3xl font-semibold mb-4">Why Choose Qport<span className="text-blue-600">.</span>?</h2>
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

        {/* Mobile Apps Section */}
        <section id="mobile-apps" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Powerful Mobile Apps for Drivers</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Equip your drivers with cutting-edge navigation and reporting tools designed specifically for heavy cargo operations.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Turn-by-Turn Navigation</h3>
              <p className="text-slate-600 mb-4">Follow pre-recorded routes with precision GPS guidance optimized for heavy cargo vehicles.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Offline maps for remote areas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Route deviation alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Real-time traffic updates</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Status Reporting</h3>
              <p className="text-slate-600 mb-4">Keep dispatch informed with instant status updates and incident reporting capabilities.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Loading/unloading confirmation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Photo documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Emergency breakdown reporting</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Communication</h3>
              <p className="text-slate-600 mb-4">Stay connected with dispatch and fleet managers through integrated communication tools.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>In-app messaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Emergency contacts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Real-time notifications</span>
                </li>
              </ul>
            </div>
          </div>

        </section>

        {/* Comparison Table */}
        <section id="comparison" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Qport<span className="text-blue-600">.</span> vs Traditional Route Planning</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              See how Qport.'s GPS-precise route recording outperforms traditional heavy cargo navigation methods.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop Table View */}
            <div className="hidden tablet:block rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700">Feature</th>
                    <th className="py-4 px-6 text-center text-sm font-semibold text-blue-700">Qport.</th>
                    <th className="py-4 px-6 text-center text-sm font-semibold text-slate-700">Traditional Methods</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-4 px-6 text-sm text-slate-700">GPS Accuracy</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        High precision
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">Meter-level</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 text-sm text-slate-700">Route Recording</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        One-time, reusable
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">Manual each time</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-sm text-slate-700">Offline Navigation</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Yes
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-red-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        No
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 text-sm text-slate-700">Route Library</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Searchable database
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">Paper maps</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-sm text-slate-700">Real-time Feedback</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Instant sync
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">Radio/phone calls</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-4 px-6 text-sm text-slate-700">Route Failures</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Near zero
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">Common</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="tablet:hidden space-y-6">
              {[
                { feature: "GPS Accuracy", qport: "High precision", traditional: "Meter-level", qportGood: true },
                { feature: "Route Recording", qport: "One-time, reusable", traditional: "Manual each time", qportGood: true },
                { feature: "Offline Navigation", qport: "Yes", traditional: "No", qportGood: true },
                { feature: "Route Library", qport: "Searchable database", traditional: "Paper maps", qportGood: true },
                { feature: "Real-time Feedback", qport: "Instant sync", traditional: "Radio/phone calls", qportGood: true },
                { feature: "Route Failures", qport: "Near zero", traditional: "Common", qportGood: true }
              ].map((item, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">{item.feature}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-blue-700">Qport.</span>
                      <span className="flex items-center gap-1 text-sm text-green-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {item.qport}
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-slate-600">Traditional</span>
                      <span className="text-sm text-slate-600">{item.traditional}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Everything you need to know about Qport.'s heavy cargo route intelligence platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "How accurate is Qport.'s GPS tracking?",
                a: "Qport. uses centimeter-level GPS precision, providing the most accurate route recording and navigation available for heavy cargo operations. This level of accuracy ensures your drivers can confidently navigate even the most challenging routes."
              },
              {
                q: "Can drivers use Qport. in areas without cellular coverage?",
                a: "Yes! Qport.'s mobile app includes offline navigation capability. Once a route is downloaded, drivers can navigate without any internet connection for up to 8 hours, making it perfect for remote delivery locations."
              },
              {
                q: "How does route recording work?",
                a: "Simply drive the route once while recording with Qport.. The app captures every turn, waypoint, and critical detail with GPS precision. Save it to your route library, and any driver can follow the exact same path using turn-by-turn navigation."
              },
              {
                q: "What types of cargo does Qport. support?",
                a: "Qport. is purpose-built for heavy and oversized cargo including mining equipment, construction machinery, wind turbine components, oil & gas equipment, and any cargo requiring specialized routing and clearance considerations."
              },
              {
                q: "How long does it take to implement Qport.?",
                a: "Most companies are up and running within 1-2 weeks. Our team provides comprehensive onboarding, driver training, and technical support to ensure a smooth transition to GPS-precise route intelligence."
              },
              {
                q: "Can Qport. integrate with our existing fleet management system?",
                a: "Yes! Qport. offers API integration capabilities to connect with most major fleet management and dispatch systems. Contact our team to discuss your specific integration requirements."
              }
            ].map((faq, index) => (
              <details key={index} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.q}</h3>
                  <svg className="w-5 h-5 text-slate-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
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
                Get early access to Qport. and help us build the perfect solution.
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
                    {formStatus.state === "loading" ? "Submitting..." : "Book Demo"}
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
