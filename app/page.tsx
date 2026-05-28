"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Leaf,
  ShoppingBag,
  Star,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Truck,
  RefreshCw,
  Shield,
  Mail,
  Heart,
  Package,
} from "lucide-react";

import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
/* ─────────────── DATA ─────────────── */

const NAV_LINKS = [
  { label: "Shop", href: "#categories" },
  { label: "Collections", href: "#products" },
  { label: "About", href: "#features" },
  { label: "Journal", href: "#" },
];

const FEATURES = [
  {
    icon: <Leaf size={22} />,
    title: "Sustainably Sourced",
    desc: "Every piece is crafted from ethically harvested natural clay, fired in kilns powered by renewable energy.",
  },
  {
    icon: <Package size={22} />,
    title: "Artisan Crafted",
    desc: "Hand-thrown by master potters with decades of experience, ensuring each piece carries a unique character.",
  },
  {
    icon: <Truck size={22} />,
    title: "Careful Delivery",
    desc: "Nestled in recycled packaging, your order arrives safely wrapped in organic cotton and recycled paper.",
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy. We stand behind every piece we put our name on.",
  },
  {
    icon: <Shield size={22} />,
    title: "Lifetime Guarantee",
    desc: "Crafted to last generations. Our premium pieces come with a lifetime structural guarantee.",
  },
  {
    icon: <Heart size={22} />,
    title: "Made with Love",
    desc: "Each item is individually signed by its maker. You're not buying a product — you're owning a story.",
  },
];

const CATEGORIES = [
  {
    name: "Ceramic Pots",
    count: "48 pieces",
    bg: "bg-[#C4622D]",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
  },
  {
    name: "Planters",
    count: "32 pieces",
    bg: "bg-[#8B6914]",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
  },
  {
    name: "Decorative Vases",
    count: "61 pieces",
    bg: "bg-[#6B4C3B]",
    img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
  },
  {
    name: "Tableware",
    count: "27 pieces",
    bg: "bg-[#A0522D]",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

const PRODUCTS = [
{
name: "Handmade Kulhad",
price: "₹299",
tag: "Bestseller",
rating: 4.9,
reviews: 128,
img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80",
},
{
name: "Hanging Planter",
price: "₹399",
tag: "New",
rating: 4.8,
reviews: 94,
img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
},
{
name: "Clay Vase",
price: "₹449",
tag: "Sale",
rating: 4.7,
reviews: 73,
img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80",
},
{
name: "Bonsai Pot",
price: "₹499",
tag: null,
rating: 5.0,
reviews: 41,
img: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=500&q=80",
},
];

const TESTIMONIALS = [
  {
    name: "Sofia Mercer",
    role: "Interior Designer",
    body: "ClayDecore pieces have transformed the spaces I design. The texture and weight of each pot feels considered — never mass produced.",
    stars: 5,
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Arjun Kapoor",
    role: "Plant Collector",
    body: "I've ordered from dozens of pottery shops. Nothing compares to the quality here. My monstera finally has a home worthy of it.",
    stars: 5,
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Lena Hoffmann",
    role: "Home Stylist",
    body: "The terracotta arch vase is a statement piece. It photographs beautifully for editorial shoots and holds up in real life use.",
    stars: 5,
    avatar: "https://i.pravatar.cc/80?img=29",
  },
];

/* ─────────────── ANIMATION VARIANTS ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────── SECTION WRAPPER ─────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
 {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────── STAR RATING ─────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < Math.round(rating) ? "fill-[#C4622D] text-[#C4622D]" : "text-[#C4622D]/30"}
        />
      ))}
    </div>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
  <Navbar />
  <CartSidebar />
    <div className="bg-[#FAF6F1] text-[#2C1A0E] font-sans overflow-x-hidden">
      {/* ─── GOOGLE FONTS ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.35;
        }
      `}</style>

      <div className="grain" />

      {/* ════════════════════════════════════
          NAVBAR
      ════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#FAF6F1]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-[#C4622D] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Leaf size={16} className="text-[#FAF6F1]" />
            </span>
            <span className="serif text-xl font-bold tracking-tight text-[#2C1A0E]">
              Clay<span className="text-[#C4622D]">Decore</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#5C3D2E] hover:text-[#C4622D] transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4622D] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="relative p-2 hover:text-[#C4622D] transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C4622D] rounded-full" />
            </button>
            <a
              href="#products"
              className="bg-[#C4622D] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#A0522D] transition-colors shadow-md hover:shadow-lg"
            >
              Shop Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#2C1A0E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-[#FAF6F1]/98 backdrop-blur-md border-t border-[#C4622D]/10"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-base font-medium text-[#5C3D2E] hover:text-[#C4622D] transition-colors py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#products"
                  className="bg-[#C4622D] text-white text-sm font-medium px-5 py-2.5 rounded-full text-center mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax bg */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=1800&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F1]/95 via-[#FAF6F1]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F1]/60 to-transparent" />
        </motion.div>

        {/* Decorative blob */}
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-[#C4622D]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-[#8B6914]/8 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 grid lg:grid-cols-2 items-center gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#C4622D]/10 border border-[#C4622D]/25 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4622D]" />
              <span className="text-xs font-medium text-[#C4622D] tracking-wide uppercase">
                Artisan Pottery &amp; Plants
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] text-[#2C1A0E] mb-6"
            >
              Earth-born
              <br />
              <em className="text-[#C4622D] not-italic">beauty,</em>
              <br />
              home-grown.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[#5C3D2E] text-lg leading-relaxed max-w-md mb-8"
            >
              Handcrafted ceramic pots and planters, born from the earth and shaped by artisan hands.
              Bring the warmth of natural clay into your living space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#products"
                className="group inline-flex items-center gap-2 bg-[#C4622D] text-white font-medium px-7 py-3.5 rounded-full hover:bg-[#A0522D] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-[#5C3D2E] font-medium px-7 py-3.5 rounded-full border border-[#5C3D2E]/25 hover:border-[#C4622D] hover:text-[#C4622D] transition-all"
              >
                Our Story
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex items-center gap-6 mt-10"
            >
              {[
                { value: "4.9★", label: "Rating" },
                { value: "2,400+", label: "Happy Customers" },
                { value: "180+", label: "Unique Pieces" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="serif text-xl font-bold text-[#2C1A0E]">{s.value}</p>
                  <p className="text-xs text-[#8B6914] font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=85"
                alt="Featured pottery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/40 to-transparent" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs text-[#8B6914] font-medium">Bestseller</p>
                <p className="serif text-sm font-bold text-[#2C1A0E]">Arch Vase</p>
                <p className="text-[#C4622D] font-semibold text-sm mt-0.5">$84</p>
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs text-[#8B6914]">New Drop</p>
                  <p className="serif text-sm font-bold text-[#2C1A0E]">Spring Collection '26</p>
                </div>
                <ChevronRight size={18} className="text-[#C4622D]" />
              </div>
            </div>

            {/* Side accent */}
            <div className="absolute -left-6 top-1/3 w-12 h-40 bg-[#C4622D]/15 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-[#8B6914] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-[#C4622D] to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FEATURES
      ════════════════════════════════════ */}
      <Section id="features" className="py-24 bg-[#F3EDE4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-widest text-[#C4622D] uppercase mb-3 font-medium">
              Why ClayDecore
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="serif text-4xl md:text-5xl font-bold text-[#2C1A0E]">
              Crafted with intention
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="bg-[#FAF6F1] rounded-2xl p-7 border border-[#C4622D]/8 hover:border-[#C4622D]/25 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C4622D]/10 text-[#C4622D] flex items-center justify-center mb-4 group-hover:bg-[#C4622D] group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="serif text-lg font-semibold text-[#2C1A0E] mb-2">{f.title}</h3>
                <p className="text-sm text-[#5C3D2E] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════ */}
      <Section id="categories" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
            <div>
              <motion.p variants={fadeUp} className="text-xs tracking-widest text-[#C4622D] uppercase mb-3 font-medium">
                Explore
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="serif text-4xl md:text-5xl font-bold text-[#2C1A0E]">
                Browse by category
              </motion.h2>
            </div>
            <motion.a
              variants={fadeUp}
              custom={2}
              href="#products"
              className="inline-flex items-center gap-2 text-[#C4622D] text-sm font-medium hover:gap-3 transition-all"
            >
              View all <ArrowRight size={15} />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.a
                key={cat.name}
                href="#"
                variants={scaleIn}
                custom={i}
                whileHover={{ scale: 1.02 }}
                className="relative group aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer block"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="serif text-white font-semibold text-lg leading-tight">{cat.name}</p>
                  <p className="text-white/60 text-xs mt-1">{cat.count}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════ */}
      <Section id="products" className="py-24 bg-[#F3EDE4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs tracking-widest text-[#C4622D] uppercase mb-3 font-medium">
              Curated Selection
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="serif text-4xl md:text-5xl font-bold text-[#2C1A0E]">
              Featured pieces
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#5C3D2E] mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Each piece is hand-selected for quality, aesthetics, and the story it carries. Limited quantities available.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                custom={i}
                className="group bg-[#FAF6F1] rounded-2xl overflow-hidden border border-[#C4622D]/8 hover:border-[#C4622D]/20 hover:shadow-xl transition-all duration-400"
              >
                <div className="relative aspect-[3/3.5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transform: "scale(1)", transition: "transform 0.7s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {p.tag && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                        p.tag === "Bestseller"
                          ? "bg-[#C4622D] text-white"
                          : p.tag === "New"
                          ? "bg-[#2C1A0E] text-white"
                          : "bg-[#8B6914] text-white"
                      }`}
                    >
                      {p.tag}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <Heart size={14} className="text-[#C4622D]" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Stars rating={p.rating} />
                    <span className="text-xs text-[#8B6914] ml-1">({p.reviews})</span>
                  </div>
                  <h3 className="serif font-semibold text-[#2C1A0E] text-base mb-3">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C4622D] font-bold text-lg">{p.price}</span>
                    <button className="w-8 h-8 rounded-full bg-[#C4622D] text-white flex items-center justify-center hover:bg-[#A0522D] transition-colors shadow-md hover:shadow-lg hover:scale-110 active:scale-95">
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={5} className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#2C1A0E] text-[#FAF6F1] font-medium px-8 py-3.5 rounded-full hover:bg-[#C4622D] transition-colors shadow-md hover:shadow-lg"
            >
              View All Products <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════
          BANNER STRIP
      ════════════════════════════════════ */}
      <div className="bg-[#C4622D] py-4 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm text-white/80 font-medium tracking-wide flex items-center gap-4">
              Free shipping over ₹2499
              <span className="text-white/40">✦</span>
              Handcrafted in India
              <span className="text-white/40">✦</span>
              30-day returns
              <span className="text-white/40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs tracking-widest text-[#C4622D] uppercase mb-3 font-medium">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="serif text-4xl md:text-5xl font-bold text-[#2C1A0E]">
              Loved by collectors
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                className="bg-[#F3EDE4] rounded-2xl p-7 border border-[#C4622D]/10 hover:border-[#C4622D]/25 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} className="fill-[#C4622D] text-[#C4622D]" />
                  ))}
                </div>
                <p className="text-[#5C3D2E] text-sm leading-relaxed flex-1 mb-6 italic">"{t.body}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C4622D]/20"
                  />
                  <div>
                    <p className="serif text-sm font-semibold text-[#2C1A0E]">{t.name}</p>
                    <p className="text-xs text-[#8B6914]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════ */}
      <Section className="py-24 bg-[#2C1A0E]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            variants={scaleIn}
            className="w-14 h-14 rounded-full bg-[#C4622D]/20 flex items-center justify-center mx-auto mb-6"
          >
            <Mail size={24} className="text-[#C4622D]" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="serif text-4xl md:text-5xl font-bold text-[#FAF6F1] mb-4">
            Join the circle
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#D4A27A] text-sm leading-relaxed mb-8">
            Be the first to know about new drops, exclusive offers, and pottery tips from our artisans.
            No spam — only the good stuff.
          </motion.p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#C4622D]/20 border border-[#C4622D]/30 rounded-2xl p-6 text-[#FAF6F1]"
              >
                <p className="serif text-xl font-semibold mb-1">You're in! 🎉</p>
                <p className="text-sm text-[#D4A27A]">Watch your inbox for earthy goodness.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={fadeUp}
                custom={3}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/15 text-white placeholder:text-white/35 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C4622D]/60"
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="bg-[#C4622D] text-white font-medium px-6 py-3 rounded-full hover:bg-[#A0522D] transition-colors whitespace-nowrap shadow-lg"
                >
                  Subscribe
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer className="bg-[#1A0E06] text-[#D4A27A] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#C4622D] flex items-center justify-center">
                  <Leaf size={16} className="text-white" />
                </span>
                <span className="serif text-xl font-bold text-white">
                  Clay<span className="text-[#C4622D]">Decore</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#8B6914] mb-5">
                Born from earth, shaped by hand. Premium pottery and planters for the modern home.
              </p>
              <div className="flex gap-3">
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Shop",
                links: ["Ceramic Pots", "Planters", "Vases", "Tableware", "Gift Sets"],
              },
              {
                title: "Company",
                links: ["About Us", "Our Artisans", "Sustainability", "Journal", "Press"],
              },
              {
                title: "Support",
                links: ["FAQ", "Shipping Info", "Returns", "Track Order", "Contact"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white text-sm font-semibold mb-4 tracking-wide">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-[#8B6914] hover:text-[#C4622D] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5C3D2E]">
            <p>© 2026 ClayDecore. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#C4622D] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C4622D] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#C4622D] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}