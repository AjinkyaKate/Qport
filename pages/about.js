import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";



const About = () => {
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>About Qport | Heavy Cargo Route Intelligence</title>
        <meta
          name="description"
          content="Learn about Qport's mission to revolutionize heavy cargo logistics through intelligent route recording and navigation technology."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero Section */}
        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            Revolutionizing Heavy Cargo Logistics
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Qport was born from firsthand experience with the challenges of navigating oversized loads
            to remote destinations. We're building the future of heavy cargo route intelligence.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-24">
          <div className="grid gap-16 laptop:grid-cols-2 laptop:items-center">
            <div>
              <h2 className="text-3xl font-semibold">Our Mission</h2>
              <p className="mt-4 text-lg opacity-80">
                To eliminate route uncertainty for heavy cargo operators through proven route intelligence,
                precision navigation, and real-time logistics coordination.
              </p>
              <p className="mt-4 opacity-70">
                Every failed delivery, every damaged load, every missed deadline represents more than just
                operational costs—it impacts communities waiting for critical infrastructure and resources.
                We're committed to ensuring heavy cargo reaches its destination safely and efficiently.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Why We Exist</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Mining operations need reliable equipment transport to remote sites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Wind farms require oversized turbine components delivered safely</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Construction projects depend on heavy machinery arriving on schedule</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600">•</span>
                  <span>Energy infrastructure relies on specialized transport expertise</span>
                </li>
              </ul>
            </div>
          </div>
        </section>



        {/* Values Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Our Values</h2>
          </div>
          <div className="grid gap-6 laptop:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Safety First</h3>
              <p className="text-sm opacity-80">
                Every feature we build prioritizes the safety of drivers, equipment, and communities.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Field-Tested</h3>
              <p className="text-sm opacity-80">
                Our solutions are developed by and for people who understand heavy cargo operations.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Continuous Innovation</h3>
              <p className="text-sm opacity-80">
                We constantly evolve our platform based on real-world feedback and emerging technology.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;