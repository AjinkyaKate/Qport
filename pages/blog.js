import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const blogPosts = [
  {
    id: "heavy-cargo-route-planning-best-practices",
    title: "Heavy Cargo Route Planning: 5 Best Practices for Success",
    excerpt: "Learn the essential strategies that experienced logistics managers use to plan safe and efficient heavy cargo routes.",
    author: "Sarah Chen",
    authorRole: "Logistics Expert",
    publishDate: "2025-01-15",
    readTime: "8 min read",
    category: "Best Practices",
    featured: true,
    image: "/assets/blog/route-planning.jpg",
    tags: ["Route Planning", "Safety", "Heavy Cargo"]
  },
  {
    id: "gps-accuracy-heavy-equipment-transport",
    title: "Why GPS Accuracy Matters for Heavy Equipment Transport",
    excerpt: "Discover how centimeter-level GPS precision can prevent costly delays and equipment damage in heavy cargo operations.",
    author: "Marcus Rodriguez",
    authorRole: "Technology Lead",
    publishDate: "2025-01-10",
    readTime: "6 min read",
    category: "Technology",
    featured: false,
    image: "/assets/blog/gps-accuracy.jpg",
    tags: ["GPS", "Technology", "Precision"]
  },
  {
    id: "mining-equipment-transport-challenges",
    title: "Overcoming Mining Equipment Transport Challenges",
    excerpt: "Real-world case study: How NorthPoint Mining reduced transport failures by 95% using proven route intelligence.",
    author: "Mike Patterson",
    authorRole: "Industry Partner",
    publishDate: "2025-01-05",
    readTime: "10 min read",
    category: "Case Study",
    featured: true,
    image: "/assets/blog/mining-transport.jpg",
    tags: ["Mining", "Case Study", "Success Story"]
  },
  {
    id: "wind-turbine-blade-transport-guide",
    title: "The Complete Guide to Wind Turbine Blade Transport",
    excerpt: "Navigate the complexities of transporting 120-foot turbine blades through challenging terrain with confidence.",
    author: "Dr. Jennifer Walsh",
    authorRole: "Route Optimization Specialist",
    publishDate: "2025-01-28",
    readTime: "12 min read",
    category: "Industry Guide",
    featured: false,
    image: "/assets/blog/wind-turbine.jpg",
    tags: ["Wind Energy", "Renewable", "Oversized Loads"]
  },
  {
    id: "route-recording-vs-traditional-planning",
    title: "Route Recording vs Traditional Planning: A Comparison",
    excerpt: "Compare traditional route planning methods with modern GPS route recording technology and their impact on operations.",
    author: "Sarah Chen",
    authorRole: "Logistics Expert",
    publishDate: "2025-01-20",
    readTime: "7 min read",
    category: "Technology",
    featured: false,
    image: "/assets/blog/comparison.jpg",
    tags: ["Route Recording", "Technology", "Comparison"]
  },
  {
    id: "heavy-cargo-safety-regulations-2025",
    title: "Heavy Cargo Safety Regulations: 2025 Updates",
    excerpt: "Stay compliant with the latest safety regulations and requirements for heavy cargo transportation across North America.",
    author: "Legal Team",
    authorRole: "Compliance Experts",
    publishDate: "2025-01-15",
    readTime: "9 min read",
    category: "Regulations",
    featured: false,
    image: "/assets/blog/regulations.jpg",
    tags: ["Safety", "Regulations", "Compliance"]
  }
];

const categories = ["All", "Best Practices", "Technology", "Case Study", "Industry Guide", "Regulations"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Blog & Resources | Qport Heavy Cargo Intelligence</title>
        <meta
          name="description"
          content="Expert insights, best practices, and industry guidance for heavy cargo logistics and route optimization."
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
            Blog & Resources
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Expert insights, industry best practices, and practical guidance for heavy cargo
            logistics professionals.
          </p>
        </section>

        {/* Featured Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Featured Articles</h2>
          <div className="grid gap-8 laptop:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video w-full rounded-lg bg-slate-200 mb-4 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">Featured Image</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {post.category}
                  </span>
                  <span className="text-xs opacity-60">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 leading-tight">{post.title}</h3>
                <p className="text-sm opacity-80 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs opacity-60">{post.authorRole}</div>
                    </div>
                  </div>
                  <Button classes="text-sm px-4 py-2">
                    Read More →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mt-24">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
            <div className="flex flex-col tablet:flex-row gap-4 tablet:items-center tablet:justify-between">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300 text-slate-900 placeholder-slate-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">
            All Articles
            {filteredPosts.length !== blogPosts.length && (
              <span className="text-base font-normal opacity-60 ml-2">
                ({filteredPosts.length} of {blogPosts.length})
              </span>
            )}
          </h2>
          <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video w-full rounded-lg bg-slate-200 mb-4 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">Article Image</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {post.category}
                  </span>
                  <span className="text-xs opacity-60">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 leading-tight">{post.title}</h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="opacity-60">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Read More →
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-60">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters and show all articles
              </button>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-24">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Stay Updated with Heavy Cargo Insights
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get the latest industry insights, best practices, and Qport updates delivered
              to your inbox monthly.
            </p>
            <div className="flex flex-col tablet:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all duration-200 shadow-sm"
              />
              <Button classes="bg-white text-blue-600 hover:bg-slate-100 px-6 py-2">
                Subscribe
              </Button>
            </div>
            <p className="text-xs opacity-70 mt-3">
              No spam. Unsubscribe anytime. Privacy policy applies.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blog;